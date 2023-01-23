const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  line: {
    type: String,
    required: true,
  },
});

const Data = mongoose.models.Data || mongoose.model("Data", dataSchema);

module.exports = Data;
