const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRouter = require('./routes/auth'); // Import auth routes

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); // To parse JSON requests

// Use the /api/auth prefix for all routes in authRouter
app.use('/api/auth', authRouter);

mongoose.connect(process.env.ATLAS_URI)
  .then(() => console.log('MongoDB database connection established successfully'))
  .catch(err => console.log('MongoDB connection error:', err));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
