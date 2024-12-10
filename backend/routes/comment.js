const express = require('express');
const { getPostComments } = require('../controllers/commentController');
const { authenticateToken } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/:postId', authenticateToken, getPostComments);

module.exports = router;