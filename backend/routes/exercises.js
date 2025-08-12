const express = require('express');
const router = express.Router();
const Exercise = require('../models/exercise.model');

// GET all exercises
router.get('/', async (req, res) => {
  try {
    const exercises = await Exercise.find();
    res.json(exercises);
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

// POST a new exercise
router.post('/add', async (req, res) => {
  const { name, type, duration, date } = req.body;
  
  const newExercise = new Exercise({
    name,
    type,
    duration,
    date,
  });

  try {
    await newExercise.save();
    res.json('Exercise added!');
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

module.exports = router;
