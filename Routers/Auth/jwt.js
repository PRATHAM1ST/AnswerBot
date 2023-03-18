require("dotenv").config();

const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

// Creating a secret key
const secret = process.env.JWT_SECRET_KEY;

// Check for authoririty
router.use((req, res, next) => {
	const token = req.cookies.token;
	if (!token) {
		// Generate the JWT
		const token = jwt.sign({ id: uuidv4() }, secret);

		// Set the JWT as a cookie
		res.cookie("token", token, { httpOnly: true });
		// return res.redirect(302, req.originalUrl);
	}
	try {
		const decoded = jwt.verify(token, secret);
		req.user = decoded;
		next();
	} catch (err) {
		return res.status(401).send({ message: "Invalid token" });
	}
});

router.get("/verifyJWT", (req, res) => {
	res.status(200).send({ message: "JWT verified", user: req.user });
});

module.exports = router;