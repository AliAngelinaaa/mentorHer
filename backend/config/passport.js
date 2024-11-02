const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const Profile = require('../models/Profile');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await Profile.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      // Check if user exists
      let user = await Profile.findOne({ googleId: profile.id });
      
      if (user) {
        return done(null, user);
      }
      
      // If not, create new user profile (without role/skills/etc)
      user = await Profile.create({
        googleId: profile.id,
        email: profile.emails[0].value,
        name: profile.displayName,
        picture: profile.photos[0].value,
        // These will be set later via the complete-profile endpoint
        role: 'mentee', // default role
        skills: [],
        interests: [],
        goals: []
      });
      
      done(null, user);
    } catch (err) {
      done(err);
    }
  }
));

module.exports = passport; 