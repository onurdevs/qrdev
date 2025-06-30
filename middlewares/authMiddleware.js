const jwt = require("jsonwebtoken");
const db = require("../models");

const User = db.User;

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Yetkilendirme gerekli." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id);

    if (!user) {
      return res.status(401).json({ message: "Kullanıcı bulunamadı." });
    }

    req.user = user; // diğer endpointlerde kullanılabilir
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: "Geçersiz token." });
  }
};

module.exports = authMiddleware;
