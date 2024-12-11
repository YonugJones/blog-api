const express = require('express');
const { getAllPosts, getPostById, createPost, editPost, sofDeletePost } = require('../controllers/postController');
const { getPostComments, createComment, editComment, likeComment, softDeleteComment } = require('../controllers/commentController');
const { authenticateToken } = require('../middleware/authMiddleware');
const router = express.Router();

// blog post routes
// /posts/
router.get('/', getAllPosts);
router.get('/:id', authenticateToken, getPostById);
router.post('/', authenticateToken, createPost);
router.put('/:id', authenticateToken, editPost);
router.delete('/:id', authenticateToken, sofDeletePost);

// Comment routes
// /posts/
router.get('/:id/comments', authenticateToken, getPostComments);
router.post('/:id/comments', authenticateToken, createComment);
router.put('/:id/comments', authenticateToken, editComment);
router.post('/:id/comments/like', authenticateToken, likeComment);
router.delete('/:id/comments', authenticateToken, softDeleteComment);

module.exports = router;