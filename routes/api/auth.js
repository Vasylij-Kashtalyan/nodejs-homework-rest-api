const express = require("express");

const ctrl = require("../../controllers/auth");

const { ctrlWrapper } = require("../../helpers");
const { auth } = require("../../middlewares");

const router = express.Router();

//  signup
router.post("/register", ctrlWrapper(ctrl.register));

//  sigin
router.post("/login", ctrlWrapper(ctrl.login));

router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));

router.get("/logout", auth, ctrlWrapper(ctrl.logout));

module.exports = router;
