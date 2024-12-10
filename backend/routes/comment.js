const express = require('express');
const { getCommentsFromPost } = require('../controllers/commentController');
const router = express.Router();

router.get('/:postId', getCommentsFromPost)

module.exports = router;