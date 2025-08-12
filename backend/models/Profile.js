const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  bio: { type: String },
  location: { type: String },
  age: { type: Number },
  // Add more fields as required
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
