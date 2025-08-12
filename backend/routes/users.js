const router = require('express').Router();
const User = require('../models/user.model');
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

// GET /api/users/profile - Get current user info
router.get('/profile', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT /api/users/update - Update user info
router.put('/update', verifyToken, async (req, res) => {
  try {
    const { email, username } = req.body;
    
    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      { email, username },
      { new: true }
    ).select('-password');
    
    res.json({ 
      message: 'User updated successfully', 
      user: updatedUser 
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;