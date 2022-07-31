const Contact = require("../../models/contact");
const { createError } = require("../../helpers");

const getById = async (req, res, next) => {
  const { id } = req.params;
  // const result = await Contact.findOne({ _id: id }) варіант як ще можна робити;
  const result = await Contact.findById(id);

  if (!result) throw createError(404);
  res.json(result);
};

module.exports = getById;
