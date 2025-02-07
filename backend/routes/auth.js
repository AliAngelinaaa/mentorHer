const express = require('express');
const router = express.Router();
const passport = require('passport');

// Google OAuth routes
router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

router.get('/google/callback', 
  passport.authenticate('google', { 
    failureRedirect: '/login',
    successRedirect: '/dashboard'
  })
);

// Important: export the router directly
module.exports = router; 