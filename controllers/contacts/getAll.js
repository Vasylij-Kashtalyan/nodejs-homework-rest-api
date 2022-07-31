const Contact = require("../../models/contact");

const getAll = async (req, res, next) => {
  // якщо потрібно виключити поля(не передавати) "-createdAt -updatedAt";
  // якщо потрібно передати тільки ці поля "createdAt updatedAt";
  const result = await Contact.find({}, "-createdAt -updatedAt");
  res.json(result);
};

module.exports = getAll;
