const express = require("express");
const router = express.Router();
const { getPublicMenu, getQrCode } = require("../controllers/publicController");

router.get("/menu/:restaurantId", getPublicMenu);
router.get("/menu/:restaurantId/qr", getQrCode);

module.exports = router;
