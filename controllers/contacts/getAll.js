const { Contact } = require("../../models/contact");

const getAll = async (req, res, next) => {
  const { id: owner } = req.user;

  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;
  // skip скільки потрібно пропустити з початку бази

  // якщо потрібно виключити поля(не передавати) "-createdAt -updatedAt";
  // якщо потрібно передати тільки ці поля "createdAt updatedAt";
  const result = await Contact.find({ owner }, "-createdAt -updatedAt", {
    skip,
    limit: Number(limit),
  }).populate("owner", "name email");

  res.json(result);
};

module.exports = getAll;
