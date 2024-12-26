const express = require('express');
const userController = require('../controllers/userController');
const { authenticateToken, authorizeAdmin } = require('../middleware/authMiddleware')
const router = express.Router();

// /users route
router.get('/', authenticateToken, authorizeAdmin, userController.getAllUsers);
router.get('/:id', authenticateToken, authorizeAdmin, userController.getUser);
router.delete('/delete/:id', authenticateToken, authorizeAdmin, userController.softDeleteUser);

module.exports = router;