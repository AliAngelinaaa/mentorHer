const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
const{OAuth2Client} = require;

router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

module.exports = router;