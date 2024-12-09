const express = require('express');
const { getAllPosts, getPostById, createPost, updatePost } = require('../controllers/postController');
const { authenticateToken } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', getAllPosts);
router.get('/:id', authenticateToken, getPostById);
router.post('/create', authenticateToken, createPost);
router.post('/update/:id', authenticateToken, updatePost);

module.exports = router;