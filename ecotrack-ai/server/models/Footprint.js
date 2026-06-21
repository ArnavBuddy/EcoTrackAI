const mongoose = require("mongoose");

const footprintSchema = new mongoose.Schema({
  transport: Number,
  electricity: Number,
  food: Number,
  total: Number,
  ecoScore: Number,
  biggestSource: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Footprint", footprintSchema);
