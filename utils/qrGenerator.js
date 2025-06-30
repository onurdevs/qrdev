const QRCode = require("qrcode");
const logger = require("./logger");

const generateQRCode = async (text) => {
  try {
    return await QRCode.toDataURL(text);
  } catch (err) {
    logger.error("QR oluşturulamadı: %O", err);
    return null;
  }
};

module.exports = generateQRCode;
