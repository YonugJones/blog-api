const express = require('express');
const { getAllPosts, getPostById, createPost, editPost, sofDeletePost } = require('../controllers/postController');
const { getPostComments, createComment, editComment } = require('../controllers/commentController');
const { authenticateToken } = require('../middleware/authMiddleware');
const router = express.Router();

// Blog Post routes
router.get('/', getAllPosts);
router.get('/:id', authenticateToken, getPostById);
router.post('/create', authenticateToken, createPost);
router.put('/:id', authenticateToken, editPost);
router.delete('/:id', authenticateToken, sofDeletePost);

// Comment routes
router.get('/:id/comments', authenticateToken, getPostComments);
router.post('/:id/comments', authenticateToken, createComment);
router.put('/:id/comments', authenticateToken, editComment);

module.exports = router;