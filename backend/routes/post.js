const express = require('express');
const { getAllPosts, createPost } = require('../controllers/postController');
const { authenticateToken } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', getAllPosts);
router.post('/create', authenticateToken, createPost);

module.exports = router;