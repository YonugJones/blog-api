const express = require('express');
const { getAllUsers, getUser, softDeleteUser } = require('../controllers/userController');
const { authenticateToken, authorizeAdmin } = require('../middleware/authMiddleware')
const router = express.Router();

// /users route
router.get('/', authenticateToken, authorizeAdmin, getAllUsers);
router.get('/:id', authenticateToken, authorizeAdmin, getUser);
router.delete('/delete/:id', authenticateToken, authorizeAdmin, softDeleteUser);

module.exports = router;