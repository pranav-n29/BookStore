const express = require("express");
const { registerUser, loginUser, getLoggedInUser } = require("../controllers/authController");
const { isLoggedIn } = require("../middlewares/isLoggedIn");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", isLoggedIn, getLoggedInUser);

module.exports = router;
