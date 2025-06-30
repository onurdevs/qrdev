const express = require("express");
const router = express.Router();

const { register, login, updateSubscriptionPlan } = require("../controllers/authController");
const auth = require("../middlewares/authMiddleware"); // ✅ eksik buydu

router.post("/register", register);
router.post("/login", login);
router.put("/plan", auth, updateSubscriptionPlan);

module.exports = router;
