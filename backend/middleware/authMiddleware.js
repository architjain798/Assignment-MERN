const jwt = require("jsonwebtoken");
const BlacklistedToken = require("../models/BlacklistedToken");

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ error: "Unauthorized - Missing token" });
  }

  // Check if the token is blacklisted
  const isTokenBlacklisted = await BlacklistedToken.findOne({ token });

  if (isTokenBlacklisted) {
    return res
      .status(401)
      .json({ error: "Unauthorized - Token is blacklisted" });
  }

  try {
    const decoded = jwt.verify(token, "your-secret-key");
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Error verifying token", error);
    res.status(401).json({ error: "Unauthorized - Invalid token" });
  }
};

module.exports = authMiddleware;
