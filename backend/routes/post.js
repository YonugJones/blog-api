const express = require('express');
const postController = require('../controllers/postController');
const commentController = require('../controllers/commentController');
const { authenticateToken } = require('../middleware/authMiddleware');
const router = express.Router();

// Post routes
router.get('/', postController.getAllPosts);
router.get('/:postId', postController.getPostById);
router.post('/', authenticateToken, postController.createPost);
router.put('/:postId', authenticateToken, postController.editPost);
router.delete('/:postId', authenticateToken, postController.softDeletePost);

// Comment routes nested under Posts
router.get('/:postId/comments', authenticateToken, commentController.getPostComments);
router.post('/:postId/comments', authenticateToken, commentController.createComment);
router.put('/:postId/comments/:commentId', authenticateToken, commentController.editComment);
router.post('/:postId/comments/:commentId/like', authenticateToken, commentController.likeComment);
router.delete('/:postId/comments/:commentId', authenticateToken, commentController.softDeleteComment);

module.exports = router;