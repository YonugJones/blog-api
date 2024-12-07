const express = require('express');
const { getAllUsers, getUser, softDeleteUser } = require('../controllers/userController');
const router = express.Router();

// /users route
router.get('/', getAllUsers);
router.get('/:id', getUser);
router.delete('/delete/:id', softDeleteUser);

module.exports = router;