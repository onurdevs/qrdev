const logger = require("../utils/logger");

const errorHandler = (err, req, res, next) => {
  logger.error("Hata yakalandı: %O", err);

  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;

  res.status(statusCode).json({
    message: err.message || "Bilinmeyen bir hata oluştu.",
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};

module.exports = errorHandler;
