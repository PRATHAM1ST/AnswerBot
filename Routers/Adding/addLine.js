require('dotenv').config();

const express = require('express');
const fs = require('fs');
const router = express.Router()

const filePath = process.env.FILE_PATH

router.post("/addLine", (req, res) => {
    // Get the line to add from the request body
    let line = req.body.line;

    // Checking if the line contains fullstop at the end 
    if(line[line.length - 1] != "."){
        line += "."
    }

    // Append the line to the file
    fs.appendFile(filePath, line + "\r\n", (err) => {
        if (err) {
            res.status(500).send({ message: "Error adding line to file" });
        } else {
            res.status(200).send({ message: "Line added to file" });
        }
    });
});

module.exports = router;