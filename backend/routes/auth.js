const express = require('express');
const { signup, login } = require('../controllers/authController');
const { validateSignup } = require('../middleware/validateInput');
const router = express.Router();

// /auth route
router.post('/signup', validateSignup, signup);
router.post('/login', login);

module.exports = router;