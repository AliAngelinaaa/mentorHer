const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  picture: String,
  role: {
    type: String,
    enum: ['mentor', 'mentee'],
    required: true
  },
  bio: {
    type: String,
    maxlength: 300 // Limit bio length for readability
  },
  skills: [String],
  interests: [String],
  goals: [String],
  availability: {
    type: String, // e.g., "Weekdays after 6 PM" or "Weekends"
  },
  location: {
    type: String, // Country or timezone
  },
  matchPreferences: {
    preferredSkills: [String], // Skills they want in a match
    preferredGoals: [String]   // Goals they want in a match
  },
  matchScore: {
    type: Number, // Potential metric for match quality or compatibility score
    default: 0
  },
  lastLogin: {
    type: Date,
    default: Date.now
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Profile', profileSchema);
