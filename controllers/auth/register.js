const { User, schemas } = require("../../models/user");
const { createError } = require("../../helpers");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  const { error } = schemas.register.validate(req.body);
  if (error) throw createError(400, error.message);

  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) throw createError(409, `${email} is already exist`);

  const hashPassword = await bcrypt.hash(password, 10);

  const result = await User.create({ ...req.body, password: hashPassword });
  res.status(201).json({
    email: result.email,
    name: result.name,
  });
};

module.exports = register;
