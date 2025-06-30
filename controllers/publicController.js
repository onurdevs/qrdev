const db = require("../models");
const generateQRCode = require("../utils/qrGenerator");
const logger = require("../utils/logger");

const Restaurant = db.Restaurant;
const Category = db.Category;
const MenuItem = db.MenuItem;

exports.getPublicMenu = async (req, res) => {
  try {
    const { restaurantId } = req.params;

    const restaurant = await Restaurant.findByPk(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: "Restoran bulunamadı." });
    }

    const categories = await Category.findAll({
      where: { restaurantId },
      include: [{ model: MenuItem }],
    });

    res.json({
      restaurant,
      categories,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Menü alınamadı." });
  }
};

exports.getQrCode = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const publicUrl = `https://yourdomain.com/menu/${restaurantId}`;
    const qrDataUrl = await generateQRCode(publicUrl);
    res.json({ qr: qrDataUrl, url: publicUrl });
  } catch (err) {
    logger.error("getQrCode hatası: %O", err);

    res.status(500).json({ message: "QR kod oluşturulamadı." });
  }
};
