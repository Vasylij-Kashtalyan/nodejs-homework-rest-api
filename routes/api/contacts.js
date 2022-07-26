const express = require("express");
const router = express.Router();
const modelsContacts = require("../../models/createContacts");

const { contactsSchema } = require("../../schema/contactsSchema");
const { createError } = require("../../helpers");

router.get("/", async (req, res, next) => {
  try {
    const result = await modelsContacts.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await modelsContacts.getContactById(id);

    if (!result) throw createError(404);

    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body);
    if (error) throw createError(400, error.message);

    const result = await modelsContacts.addContact(req.body);

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = modelsContacts.removeContact(id);

    if (!result) throw createError(404);

    res.json({
      message: "Contact deleted",
    });
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body);
    if (error) throw createError(400, error.message);

    const { id } = req.params;

    const result = await modelsContacts.updateById(id, req.body);
    if (!result) throw createError(404);

    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
