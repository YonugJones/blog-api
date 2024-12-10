const express = require('express');
const { getAllPosts, getPostById, createPost, updatePost, sofDeletePost } = require('../controllers/postController');
const { getPostComments } = require('../controllers/commentController');
const { authenticateToken } = require('../middleware/authMiddleware');
const router = express.Router();

// Blog Post routes
router.get('/', getAllPosts);
router.get('/:id', authenticateToken, getPostById);
router.post('/create', authenticateToken, createPost);
router.put('/:id', authenticateToken, updatePost);
router.delete('/:id', authenticateToken, sofDeletePost);

// Comment routes
router.get('/:id/comments', authenticateToken, getPostComments);

module.exports = router;