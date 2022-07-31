const { User, schemas } = require("../../models/user");
const { createError } = require("../../helpers");
const bcrypt = require("bcryptjs");

const login = async (req, res) => {
  const { error } = schemas.login.validate(req.body);
  if (error) throw createError(400, error.message);

  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) throw createError(401, "Email wrong");

  const comparePassword = await bcrypt.compare(password, user.password);
  if (!comparePassword) throw createError(401, "Password wrong");

  const token = "ksdjksd.sldksldk.dfdfd";
  res.json({
    token,
  });
};

module.exports = login;
