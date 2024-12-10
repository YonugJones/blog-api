const express = require('express');
const { getPostComments, createComment } = require('../controllers/commentController');
const { authenticateToken } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/:postId', authenticateToken, getPostComments);
router.post('/:postId/create', authenticateToken, createComment);

module.exports = router;