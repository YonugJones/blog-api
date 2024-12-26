const express = require('express');
const { authenticateToken } = require('../middleware/authMiddleware');
const { getPostComments, createComment, editComment, likeComment, softDeleteComment } = require('../controllers/commentController');
const router = express.Router();

router.get('/posts/:postId', authenticateToken, getPostComments);
router.post('/posts/:postId', authenticateToken, createComment);
router.put('/:commentId', authenticateToken, editComment);
router.post('/:commentId/like', authenticateToken, likeComment);
router.delete('/:commentId', authenticateToken, softDeleteComment);

module.exports = router;