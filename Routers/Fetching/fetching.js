const express = require("express");
const router = express.Router();

const Data = require("../../Database/DataSchema");

// Endpoint for returning random line
router.get("/randomLine", async (req, res) => {
	try {
		const data = await Data.aggregate([
			{ $match: { line: { $ne: "" } } },
			{ $sample: { size: 1 } },
		]);
		const randomLine = data[0].line;
		res.status(200).send({ text: randomLine });
	} catch (err) {
		console.error("Error collecting random line: ", err);
		res.status(500).send({ error: "Internal server error" });
	}
});

// Endpoint for returning random lines
router.get("/randomLines/:numLines", async (req, res) => {
	// Get the number of lines to return from the request parameters
	const numLines = req.params.numLines;
	if (!numLines || isNaN(numLines)) {
		return res.status(400).send({ error: "Invalid number of lines" });
	}
	try {
		const data = await Data.aggregate([
			{ $match: { line: { $ne: "" } } },
			{ $sample: { size: parseInt(numLines) } },
		]);
		const randomLines = data.map((line) => line.line);
		res.status(200).send({ randomLines });
	} catch (err) {
		console.error("Error collecting random lines: ", err);
		res.status(500).send({ error: "Internal server error" });
	}
});

// Endpoint for returning sequential lines with pagination
router.get("/sequentialLines", async (req, res) => {
	// Get the page number from the query parameters
	const page = parseInt(req.query.page) || 1;
	// Get the number of lines per page from the query parameters
	const linesPerPage = parseInt(req.query.linesPerPage) || 10;

	try {
		const data = await Data.find({ line: { $ne: "" } });
		const totalLines = data.length;

		// Pagination Logic
		const startIndex = (page - 1) * linesPerPage;
		const endIndex = startIndex + linesPerPage;
		const paginatedLines = data
			.slice(startIndex, endIndex)
			.map((line) => line.line);

		res.status(200).send({ paginatedLines, totalLines });
	} catch (err) {
		console.error("Error collecting sequential lines: ", err);
		res.status(500).send({ error: "Internal server error" });
	}
});

module.exports = router;
