const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const db = require("./models");
const errorHandler = require("./middlewares/errorHandler");
const logger = require("./utils/logger");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("combined", { stream: logger.stream }));

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/restaurants", require("./routes/restaurantRoutes"));
app.use("/api/categories", require("./routes/categoryRoutes"));
app.use("/api/menu-items", require("./routes/menuItemRoutes"));
app.use("/api/public", require("./routes/publicRoutes"));

// DB bağlantısı ve sunucuyu başlatma
const PORT = process.env.PORT || 5000;
app.use(errorHandler); // tüm rotalardan sonra tanımlanmalı

db.sequelize.sync({ alter: true }).then(() => {
  app.listen(PORT, () => {
    logger.info(`Sunucu ${PORT} portunda çalışıyor`);
  });
});
