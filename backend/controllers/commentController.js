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
      id: true,
      content: true, 
      createdAt: true, 
      user: { select: { id: true, username: true } },
      postId: true,
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

const createComment = asyncHandler(async (req, res) => {
  const user = req.user;
  const postId = parseInt(req.params.id, 10);
  const { content } = req.body;

  const post = await prisma.post.findUnique({
    where: { id: postId, isDeleted: false }
  });
  if (!post) {
    throw new CustomError(`Post with id ${postId} not found or has been deleted`, 404);
  }

  if (!content || content.trim() === '') {
    throw new CustomError('Comment content cannot be empty', 400);
  }

  const newComment = await prisma.comment.create({
    data: { content, postId, userId: user.id },
    include: { user: { select: { username: true } } }
  });

  res.status(201).json({
    success: true,
    message: 'Comment created successfully',
    comment: newComment
  });
});

const editComment = asyncHandler(async (req, res) => {
  const user = req.user;
  const postId = parseInt(req.params.id, 10);
  const { commentId, content } = req.body;

  const post = await prisma.post.findUnique({
    where: { id: postId, isDeleted: false }
  });
  if (!post) {
    throw new CustomError(`Post with id ${postId} not found or has been deleted`, 404);
  }

  const comment = await prisma.comment.findUnique({ where: { id: commentId } });
  if (!comment) {
    throw new CustomError('Comment not found', 404);
  }

  if (comment.userId !== user.id) {
    throw new CustomError('Unauthrozied to edit comment', 403);
  }

  const updatedComment = await prisma.comment.update({
    where: { id: commentId },
    data: { content }
  });

  res.status(200).json({
    success: true,
    message: 'Comment updated succesfully',
    comment: updatedComment
  });
})

module.exports = {
  getPostComments,
  createComment,
  editComment
}