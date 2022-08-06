const express = require("express");
const router = express.Router();

const ctrl = require("../../controllers/contacts");

const { auth } = require("../../middlewares");
const { ctrlWrapper } = require("../../helpers");

router.get("/", auth, ctrlWrapper(ctrl.getAll));

router.get("/:id", auth, ctrlWrapper(ctrl.getById));

router.post("/", auth, ctrlWrapper(ctrl.add));

router.put("/:id", auth, ctrlWrapper(ctrl.updateById));

router.patch("/:id/favorite", auth, ctrlWrapper(ctrl.updateByIdFavorite));

router.delete("/:id", auth, ctrlWrapper(ctrl.removeById));

module.exports = router;
