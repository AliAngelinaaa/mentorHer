const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile');

// Get all profiles
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find();
    res.json(profiles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a profile
router.post('/complete-profile', async (req, res) => {
  try {
    console.log('Received request body:', req.body); // Debug log
    
    const profile = new Profile({
      googleId: req.body.googleId,
      email: req.body.email,
      name: req.body.name,
      picture: req.body.picture,
      role: req.body.role,
      bio: req.body.bio,
      skills: req.body.skills,
      interests: req.body.interests,
      goals: req.body.goals,
      availability: req.body.availability,
      location: req.body.location,
      matchPreferences: req.body.matchPreferences
    });

    const newProfile = await profile.save();
    res.status(201).json(newProfile);
  } catch (error) {
    console.error('Error creating profile:', error); // Debug log
    res.status(400).json({ message: error.message });
  }
});

// Get one profile
router.get('/:id', async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    if (profile) {
      res.json(profile);
    } else {
      res.status(404).json({ message: 'Profile not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
