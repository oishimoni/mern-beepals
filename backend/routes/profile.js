const router = require('express').Router();
const Profile = require('../models/Profile');
const jwt = require('jsonwebtoken');

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
  
  try {
    const decoded = jwt.verify(token, 'secretKey');
    req.userId = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// GET /api/profile - Get user profile
router.get('/', verifyToken, async (req, res) => {
  try {
    const profile = await Profile.findOne({ userId: req.userId });
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/profile/create - Create user profile
router.post('/create', verifyToken, async (req, res) => {
  try {
    const { name, bio, location, age } = req.body;
    
    // Check if profile already exists
    const existingProfile = await Profile.findOne({ userId: req.userId });
    if (existingProfile) {
      return res.status(400).json({ message: 'Profile already exists' });
    }
    
    const newProfile = new Profile({
      userId: req.userId,
      name,
      bio,
      location,
      age
    });
    
    await newProfile.save();
    res.status(201).json({ message: 'Profile created successfully', profile: newProfile });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT /api/profile/update - Update user profile
router.put('/update', verifyToken, async (req, res) => {
  try {
    const { name, bio, location, age } = req.body;
    
    const updatedProfile = await Profile.findOneAndUpdate(
      { userId: req.userId },
      { name, bio, location, age },
      { new: true, upsert: true }
    );
    
    res.json({ 
      message: 'Profile updated successfully', 
      updatedProfile 
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE /api/profile/delete - Delete user profile
router.delete('/delete', verifyToken, async (req, res) => {
  try {
    await Profile.findOneAndDelete({ userId: req.userId });
    res.json({ message: 'Profile deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;