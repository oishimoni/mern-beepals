const mongoose = require('mongoose');

// Define the schema for Exercise
const exerciseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  duration: { type: Number, required: true }, // in minutes
  date: { type: Date, required: true },
});

// Create a model from the schema
const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;
