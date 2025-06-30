const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const { createCategory, getCategories } = require("../controllers/categoryController");

router.use(auth);
router.post("/", createCategory);
router.get("/", getCategories);

module.exports = router;
