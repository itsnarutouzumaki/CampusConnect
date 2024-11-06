const express = require('express');
const { register, login } = require('../Controllers/auth');
const router = express.Router();

// Auth routes
router.post('/signup', register);
router.post('/login', login);

module.exports = router;
