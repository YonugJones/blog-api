const prisma = require('../prisma/prismaClient');
const asyncHandler = require('express-async-handler');
const CustomError = require('../errors/customError');

const getPostComments = asyncHandler(async (req, res) => {
  const postId = parseInt(req.params.id, 10);
  const post = await prisma.post.findUnique({
    where: { id: postId, isDeleted: false }
  });
  if (!post) {
    throw new CustomError(`Post with id ${postId} not found or has been deleted`, 404);
  }

  const comments = await prisma.comment.findMany({
    where: { postId, isDeleted: false },
    select: { 
      content: true, 
      createdAt: true, 
      user: { select: { username: true } }
     }
  });
  if (comments.length === 0) {
    return res.status(200).json({ message: 'Post has no comments', data: [] });
  }

  res.status(200).json({
    success: true,
    message: `All comments from post with id ${postId} retrieved`,
    comments
  })
});


module.exports = {
  getPostComments
}