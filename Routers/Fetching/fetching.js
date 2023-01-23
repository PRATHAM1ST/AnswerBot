require('dotenv').config();

const express = require('express');
const fs = require('fs');
const router = express.Router()

// File path
const filePath = process.env.FILE_PATH

// Read the file once and store the lines in memory
let lines;
fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    lines = data.split("\r\n");
});

// Get single random line
router.get("/randomLine", (req, res) => {
    // Get a random line from the array and selecting which are not empty
    let randomLine;
    do {
        randomLine = lines[Math.floor(Math.random() * lines.length)];
    } while (!randomLine);

    res.send({ text: randomLine });
});

// Endpoint for returning random lines
router.get("/randomLines/:numLines", (req, res) => {
    // Get the number of lines to return from the request parameters
    const numLines = req.params.numLines;
    const randomLines = [];
    for (let i = 0; i < numLines; i++) {
        randomLines.push(lines[Math.floor(Math.random() * lines.length)]);
    }
    res.status(200).send({ randomLines });
});

// Endpoint for returning sequential lines with pagination
router.get("/sequentialLines", (req, res) => {
    // Get the page number from the query parameters
    const page = parseInt(req.query.page) || 1;
    // Get the number of lines per page from the query parameters
    const linesPerPage = parseInt(req.query.linesPerPage) || 10;

    // Pagination Logic
    const startIndex = (page - 1) * linesPerPage;
    const endIndex = startIndex + linesPerPage;
    const paginatedLines = lines.slice(startIndex, endIndex);

    res.status(200).send({ paginatedLines });
});

module.exports = router;