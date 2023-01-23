const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const app = express();

const addLine = require('./Routers/Adding/addLine')
const fetching = require('./Routers/Fetching/fetching')
const jwt = require('./Routers/Auth/jwt')
const deleteLine = require('./Routers/Removing/deleteLine')

const deployed = true;

// Cors policy
app.use(cors());

// Accepting json data
app.use(express.json());

// Accessing cookie
app.use(cookieParser());

// Welcome endpoint
app.get("/", (req, res) => {
    res.send("Welcome to the API!");
});

// endpoints
app.use(jwt)
app.use(addLine)
app.use(fetching)
app.use(deleteLine)

// 404 error endpoint
app.use((req, res) => {
    res.status(404).send({ message: "Endpoint not found" });
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
