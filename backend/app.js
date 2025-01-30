// app.js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const profileRoutes = require('./routes/profiles');
const matchesRouter = require('./routes/matches');
const connectDB = require('./db/connection');
const session = require('express-session');
const passport = require('./config/passport');
const MongoStore = require('connect-mongo');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

const app = express();
app.use(bodyParser.json());

// CORS configuration
app.use(cors({
  origin: 'http://localhost:5173', // Your frontend URL
  credentials: true, // Important for cookies/sessions
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'Accept']
}));

// Security headers - updated for Google OAuth compatibility
app.use((req, res, next) => {
  // Allow popups but maintain security
  res.header('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
  res.header('Cross-Origin-Embedder-Policy', 'require-corp');
  
  // Additional recommended security headers
  res.header('X-Frame-Options', 'SAMEORIGIN');
  res.header('X-Content-Type-Options', 'nosniff');
  res.header('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  next();
});

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // 1 day
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
    sameSite: 'lax'
  }
}));

// Add view engine setup
app.set('view engine', 'ejs');

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Remove the duplicate Google OAuth routes from here and use the router instead
app.use('/auth', authRoutes);  // Mount auth routes under /auth prefix

// Update login route to include Google login link
app.get("/login", (req, res) => {
  res.render("login");  // removed .ejs extension as it's not needed
});

app.get("/dashboard", (req, res) => {   
  if (!req.isAuthenticated()) {
    return res.redirect('/login');
  }
  res.render("dashboard", { name: req.user.name });  // removed .ejs extension
});

app.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) { return next(err); }
    res.redirect('/login');
  });
});

checkLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) { 
       return res.redirect("/dashboard")
   }
  next()
}
app.delete("/logout", (req,res) => {
  req.logOut()
  res.redirect("/login")
  console.log(`-------> User Logged out`)
})

// Use the routers
app.use('/profiles', profileRoutes);
app.use('/match', matchesRouter);  // All match routes will be prefixed with /auth

app.listen(3000, () => {
   console.log('Server running on port 3000');
});
