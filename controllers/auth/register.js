const { User, schemas } = require("../../models/user");
const { createError, sendEmail } = require("../../helpers");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");

const register = async (req, res) => {
  const { error } = schemas.register.validate(req.body);
  if (error) throw createError(400, error.message);

  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) throw createError(409, `${email} is already exist`);

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);

  const verificationToken = nanoid();
  const mail = {
    to: email,
    subject: "Підтвердження регістрації",
    html: `<a target="_blank" href="http://localhost:3000/api/auth/verify/${verificationToken}">Натисніть для підтвердження регістрації </a>`,
  };
  await sendEmail(mail);

  const result = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  res.status(201).json({
    email: result.email,
    name: result.name,
  });
};

module.exports = register;
