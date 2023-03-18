require("dotenv").config();

const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

// Creating a secret key
const secret = process.env.JWT_SECRET_KEY;

// Check for authority
router.use((req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    // Generate the JWT
    const newToken = jwt.sign({ id: uuidv4() }, secret);

    // Set the JWT as a cookie
    res.cookie("token", newToken, { httpOnly: true });
  } else {
    try {
      const decoded = jwt.verify(token, secret);
      req.user = decoded;
    } catch (err) {
      return res.status(401).send({ message: "Invalid token" });
    }
  }
  next();
});

module.exports = router;
