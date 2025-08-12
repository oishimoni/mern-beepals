const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRouter = require('./routes/auth');
const profileRouter = require('./routes/profile');
const exerciseRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); // To parse JSON requests

// Register API routes
app.use('/api/auth', authRouter);
app.use('/api/profile', profileRouter);
app.use('/api/exercises', exerciseRouter);
app.use('/api/users', usersRouter);

mongoose.connect(process.env.ATLAS_URI)
  .then(() => console.log('MongoDB database connection established successfully'))
  .catch(err => console.log('MongoDB connection error:', err));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
