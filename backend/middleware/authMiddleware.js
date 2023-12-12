const jwt = require("jsonwebtoken");
const BlacklistedToken = require("../models/BlacklistedToken");

require("dotenv").config();

const authMiddleware = async (req, res, next) => {
  const tokenHeader = req.header("Authorization");

  if (!tokenHeader || !tokenHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ error: "Unauthorized - Missing or malformed token" });
  }

  const token = tokenHeader.split(" ")[1];

  // Check if the token is blacklisted
  const isTokenBlacklisted = await BlacklistedToken.findOne({ token });

  if (isTokenBlacklisted) {
    return res
      .status(401)
      .json({ error: "Unauthorized - Token is blacklisted" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Error verifying token", error);
    res.status(401).json({ error: "Unauthorized - Invalid token" });
  }
};

module.exports = authMiddleware;
