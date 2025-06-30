const db = require("../models");
const Restaurant = db.Restaurant;

const SUBSCRIPTION_LIMITS = {
  free: 1,
  pro: 3,
  enterprise: Infinity,
};

const checkRestaurantLimit = async (req, res, next) => {
  const user = req.user;

  const limit = SUBSCRIPTION_LIMITS[user.subscriptionPlan] || 1;

  const currentCount = await Restaurant.count({ where: { ownerId: user.id } });

  if (currentCount >= limit) {
    return res.status(403).json({
      message: `Plan limitine ulaşıldı. Mevcut plan (${user.subscriptionPlan}) en fazla ${limit} restoran oluşturmanıza izin verir.`,
    });
  }

  next();
};

module.exports = { checkRestaurantLimit };
