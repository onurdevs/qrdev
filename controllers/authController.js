const db = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const generateToken = require("../utils/generateToken");

const User = db.User;

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Kullanıcı daha önce kayıtlı mı?
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Bu e-posta zaten kayıtlı." });
    }

    const user = await User.create({ name, email, password });

    return res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user.id),
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Kayıt sırasında bir hata oluştu." });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: "Geçersiz e-posta veya şifre." });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Geçersiz e-posta veya şifre." });
    }

    return res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user.id),
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Giriş sırasında bir hata oluştu." });
  }
};

exports.updateSubscriptionPlan = async (req, res) => {
  try {
    const { plan } = req.body;

    const validPlans = ["free", "pro", "enterprise"];
    if (!validPlans.includes(plan)) {
      return res.status(400).json({ message: "Geçersiz abonelik planı." });
    }

    req.user.subscriptionPlan = plan;
    req.user.subscriptionExpiresAt = null; // MVP için serbest

    await req.user.save();

    res.json({
      message: `Abonelik planı '${plan}' olarak güncellendi.`,
      plan: req.user.subscriptionPlan,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Abonelik planı güncellenemedi." });
  }
};
