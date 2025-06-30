const db = require("../models");
const Category = db.Category;

exports.createCategory = async (req, res) => {
  try {
    const { name, restaurantId } = req.body;

    const category = await Category.create({ name, restaurantId });
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ message: "Kategori eklenemedi." });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const { restaurantId } = req.query;

    const categories = await Category.findAll({ where: { restaurantId } });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: "Kategoriler getirilemedi." });
  }
};
