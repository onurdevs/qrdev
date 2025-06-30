const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const {
  createMenuItem,
  getMenuItemsByCategory,
} = require("../controllers/menuItemController");

router.use(auth);
router.post("/", createMenuItem);
router.get("/", getMenuItemsByCategory);

module.exports = router;
