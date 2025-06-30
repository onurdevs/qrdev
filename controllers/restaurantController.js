const db = require("../models");
const Restaurant = db.Restaurant;

exports.createRestaurant = async (req, res) => {
  try {
    const { name, logoUrl, themeColor, language } = req.body;

    const restaurant = await Restaurant.create({
      name,
      logoUrl,
      themeColor,
      language,
      ownerId: req.user.id,
    });

    return res.status(201).json(restaurant);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Restoran oluşturulamadı." });
  }
};

exports.getMyRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.findAll({
      where: { ownerId: req.user.id },
    });

    return res.json(restaurants);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Restoranlar alınamadı." });
  }
};

exports.updateRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findOne({
      where: { id: req.params.id, ownerId: req.user.id },
    });

    if (!restaurant) {
      return res.status(404).json({ message: "Restoran bulunamadı." });
    }

    await restaurant.update(req.body);
    return res.json(restaurant);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Restoran güncellenemedi." });
  }
};

exports.deleteRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findOne({
      where: { id: req.params.id, ownerId: req.user.id },
    });

    if (!restaurant) {
      return res.status(404).json({ message: "Restoran bulunamadı." });
    }

    await restaurant.destroy();
    return res.json({ message: "Restoran silindi." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Silme işlemi başarısız." });
  }
};
