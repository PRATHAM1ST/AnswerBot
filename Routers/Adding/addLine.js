const express = require("express");
const router = express.Router();
const Data = require("../../Database/DataSchema");

router.post("/addLine", async (req, res) => {
	try {
		// Get the line to add from the request body
		let line = req.body.line;

		// Checking if the line contains fullstop at the end
		if (line[line.length - 1] != ".") {
			line += ".";
		}
        
		// Insert the line from the database
		await Data.insertMany([{ line: line }]);

		res.status(200).send({ message: "Line deleted" });
	} catch (err) {
		console.error(err);
		res.status(500).send({ message: "Error inserting line", err });
	}
});

module.exports = router;
