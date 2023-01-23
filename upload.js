const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

// Connection URI for MongoDB Atlas
const uri =
	"mongodb+srv://pratham:U9VxGNAMqH0Tz7AI@cluster0.y8jgg3k.mongodb.net/answerbot?retryWrites=true&w=majority";

// Connect to MongoDB Atlas
mongoose
	.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		console.log("MongoDB connection successful");
	})
	.catch((err) => console.log("Error connecting to MongoDB: ", err));

// Create the Model for lines of text
const Data = mongoose.model('Data', mongoose.Schema({ line: String }));;

Data.find({}).then(doc => console.log(doc))

// File path for text file
const filePath = path.join(__dirname, "./data/Modified.txt");


// Read the contents of the text file
fs.readFile(filePath, "utf8", async (err, data) => {
	if (err) {
		console.error("Error reading file: ", err);
		return;
	}
	// Split the file contents into an array of lines
	const lines = data.split("\r\n").map((e) => "" + e);
	// Create a new document for each line and insert it into the MongoDB collection
	try {
		await Data.insertMany(lines.map((line) => ({ line: line })));
		console.log("Data inserted into MongoDB successfully");
	} catch (err) {
		console.error("Error inserting data into MongoDB: ", err);
	}
});
