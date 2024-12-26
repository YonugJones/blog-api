const express = require('express');
const { getAllPosts, getPostById, createPost, editPost, softDeletePost } = require('../controllers/postController');
const { authenticateToken } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', getAllPosts);
router.get('/:postId', authenticateToken, getPostById);
router.post('/', authenticateToken, createPost);
router.put('/:postId', authenticateToken, editPost);
router.delete('/:postId', authenticateToken, softDeletePost);

module.exports = router;