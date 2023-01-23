const express = require("express");
const router = express.Router();

// Read the file once and store the lines in memory
let lines;
const Data = require("../../Database/DataSchema");



Data.find({}).then((doc) => {
  lines = doc.map((line) => line.line);
  console.log("Data collected successfully");
}).catch((err) => {
  console.error("Error collecting data: ", err);
});

// Get single random line
router.get("/randomLine", (req, res) => {
  // Get a random line from the array and selecting which are not empty

  try{
      let randomLine;
      do {
        randomLine = lines[Math.floor(Math.random() * lines.length)];
      } while (!randomLine);
  }
  catch(e){
    Data.find({}).then((doc) => {
        lines = doc.map((line) => line.line);
        console.log("Data collected successfully");
      }).catch((err) => {
        console.error("Error collecting data: ", err);
      });
  }

  res.status(200).send({ text: randomLine });
});

// Endpoint for returning random lines
router.get("/randomLines/:numLines", (req, res) => {
  // Get the number of lines to return from the request parameters
  const numLines = req.params.numLines;
  if (!numLines || isNaN(numLines)) {
    return res.status(400).send({ error: "Invalid number of lines" });
  }
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
