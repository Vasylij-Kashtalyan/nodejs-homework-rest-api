const express = require("express");
const router = express.Router();

const ctrl = require("../../controllers/contacts");

const { ctrlWrapper } = require("../../helpers");

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:id", ctrlWrapper(ctrl.getById));

router.post("/", ctrlWrapper(ctrl.add));

router.put("/:id", ctrlWrapper(ctrl.updateById));

router.patch("/:id/favorite", ctrlWrapper(ctrl.updateByIdFavorite));

router.delete("/:id", ctrlWrapper(ctrl.removeById));

module.exports = router;
