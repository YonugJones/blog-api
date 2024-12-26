const express = require('express');
const userController = require('../controllers/userController');
const { authenticateToken, authorizeAdmin } = require('../middleware/authMiddleware')
const router = express.Router();

// /users route
router.get('/', authenticateToken, authorizeAdmin, userController.getAllUsers);
router.get('/:userId', authenticateToken, authorizeAdmin, userController.getUser);
router.delete('/delete/:userId', authenticateToken, authorizeAdmin, userController.softDeleteUser);

module.exports = router;