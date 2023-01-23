require('dotenv').config();

const express = require('express');
const fs = require('fs');
const router = express.Router()

const filePath = process.env.FILE_PATH

router.delete("/deleteLine/:index", (req, res) => {
    // Get the index of the line to delete from the request parameters
    const index = req.params.index;

    // Read the file and split it into lines
    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
            res.status(500).send({ message: "Error reading file" });
            return;
        }
        const lines = data.split("\n");
        // Delete the line at the specified index
        lines.splice(index, 1);
        // Write the updated lines back to the file
        fs.writeFile(filePath, lines.join("\n"), (err) => {
            if (err) {
                res.status(500).send({ message: "Error updating file" });
            } else {
                res.status(200).send({ message: "Line deleted" });
            }
        });
    });
});

module.exports = router;