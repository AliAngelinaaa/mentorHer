const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const config = require('../config');
const { MongoClient } = require("mongodb");
const uri = config.MONGODB_URI || "mongodb://localhost:27017";
const client = new MongoClient(uri);
const Profile = require('../models/Profile');

const genAI = new GoogleGenerativeAI(config.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Replace getProfiles with MongoDB connection
async function getProfilesFromDB() {
    try {
        await client.connect();
        const db = client.db("mentorship");
        const profiles = await db.collection("profiles").find({}).toArray();
        return profiles;
    } finally {
        // Don't close the connection here as it's reused
    }
}

// Get potential matches for a user
router.get('/:id', async (req, res) => {
    try {
        const profile = await Profile.findById(req.params.id);
        
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        // Get all profiles for matching
        const profiles = await Profile.find({});
        
        // Filter potential matches (mentors for mentees, mentees for mentors)
        const potentialMatches = profiles.filter(p => 
            p._id.toString() !== profile._id.toString() && 
            ((profile.role.toLowerCase() === 'mentor' && p.role.toLowerCase() === 'mentee') ||
             (profile.role.toLowerCase() === 'mentee' && p.role.toLowerCase() === 'mentor'))
        );

        // Calculate compatibility scores for each potential match
        const matchesWithScores = await Promise.all(potentialMatches.map(async (match) => {
            const prompt = `Analyze the compatibility between a mentor and mentee with the following profiles:
                Mentor: ${JSON.stringify(profile)}
                Mentee: ${JSON.stringify(match)}
                Provide a compatibility score between 0 and 1.`;
            
            const result = await model.generateContent(prompt);
            const response = await result.response;
            const compatibilityScore = parseFloat(response.text()) || 0.5;
            
            return { match, compatibilityScore };
        }));

        res.json(matchesWithScores);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error finding matches' });
    }
});

// Calculate compatibility between two specific profiles
router.post('/calculate', async (req, res) => {
    try {
        const { mentorId, menteeId } = req.body;
        
        const mentor = await Profile.findById(mentorId);
        const mentee = await Profile.findById(menteeId);
        
        if (!mentor || !mentee) {
            return res.status(404).json({ message: 'Mentor or Mentee not found' });
        }

        const prompt = `Analyze the compatibility between a mentor and mentee with the following profiles:
            Mentor: ${JSON.stringify(mentor)}
            Mentee: ${JSON.stringify(mentee)}
            Provide a compatibility score between 0 and 1.`;
        
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const compatibilityScore = parseFloat(response.text()) || 0.5;
        
        res.json({ compatibilityScore });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error matching profiles' });
    }
});

// Add cleanup for MongoDB connection
process.on('SIGINT', async () => {
    await client.close();
    process.exit();
});

module.exports = router;