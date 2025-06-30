const db = require("../models");
const MenuItem = db.MenuItem;

exports.createMenuItem = async (req, res) => {
  try {
    const { title, description, price, photoUrl, categoryId } = req.body;

    const item = await MenuItem.create({
      title,
      description,
      price,
      photoUrl,
      categoryId,
    });

    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ message: "Ürün eklenemedi." });
  }
};

exports.getMenuItemsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.query;

    const items = await MenuItem.findAll({ where: { categoryId } });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Ürünler getirilemedi." });
  }
};
