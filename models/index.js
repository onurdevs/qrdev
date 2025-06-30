const Sequelize = require("sequelize");
const sequelize = require("../config/db");

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require("./user.model")(sequelize, Sequelize);
db.Restaurant = require("./restaurant.model")(sequelize, Sequelize);
db.Category = require("./category.model")(sequelize, Sequelize);
db.MenuItem = require("./menuItem.model")(sequelize, Sequelize);

// İlişkiler
db.Restaurant.hasMany(db.Category, { foreignKey: "restaurantId", onDelete: "CASCADE" });
db.Category.belongsTo(db.Restaurant, { foreignKey: "restaurantId" });

db.Category.hasMany(db.MenuItem, { foreignKey: "categoryId", onDelete: "CASCADE" });
db.MenuItem.belongsTo(db.Category, { foreignKey: "categoryId" });


// İlişkilendirme
db.User.hasMany(db.Restaurant, { foreignKey: "ownerId", onDelete: "CASCADE" });
db.Restaurant.belongsTo(db.User, { foreignKey: "ownerId" });

module.exports = db;
