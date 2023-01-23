const express = require("express");
const router = express.Router();
const Data = require("../../Database/DataSchema");

router.delete("/deleteLine/:id", async (req, res) => {
	try {
		// Get the id of the line to delete from the request parameters
		const id = req.params.id;

		// Delete the line from the database
		await Data.deleteOne({ _id: id });

		res.status(200).send({ message: "Line deleted" });
	} catch (err) {
		console.error(err);
		res.status(500).send({ message: "Error deleting line", err });
	}
});

module.exports = router;
