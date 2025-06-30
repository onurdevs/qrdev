const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const {
  createRestaurant,
  getMyRestaurants,
  updateRestaurant,
  deleteRestaurant,
} = require("../controllers/restaurantController");

const { checkRestaurantLimit } = require("../middlewares/subscriptionMiddleware");

router.use(auth);

router.post("/", checkRestaurantLimit, createRestaurant);
router.get("/", getMyRestaurants);
router.put("/:id", updateRestaurant);
router.delete("/:id", deleteRestaurant);

module.exports = router;
