const prisma = require('../prisma/prismaClient');
const asyncHandler = require('express-async-handler');
const CustomError = require('../errors/customError');

const getPostComments = asyncHandler(async (req, res) => {
  const postId = parseInt(req.params.postId, 10);
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
      _count: { select: { CommentLike: true } },
      createdAt: true, 
      user: { select: { id: true, username: true } },
      postId: true,
     }
  });
  if (comments.length === 0) {
    return res.status(200).json({
      success: true,
      message: 'Post has no comments', 
      data: [] 
    });
  }

  res.status(200).json({
    success: true,
    message: `All comments from post with id ${postId} retrieved`,
    comments
  })
});

const createComment = asyncHandler(async (req, res) => {
  const user = req.user;
  const postId = parseInt(req.params.postId, 10);
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
  const commentId = parseInt(req.params.commentId, 10);
  const { content } = req.body;

  const comment = await prisma.comment.findUnique({ where: { id: commentId } });
  if (!comment) {
    throw new CustomError('Comment not found', 404);
  }

  if (comment.userId !== user.id) {
    throw new CustomError('Unauthrozied to edit comment', 403);
  }

  if (!content) {
    throw new CustomError('Content cannot be empty', 400)
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
});

const likeComment = asyncHandler(async (req, res) => {
  const user = req.user;
  const commentId = parseInt(req.params.commentId, 10);
  const comment = await prisma.comment.findUnique({ where: { id: commentId } });
  if (!comment) {
    throw new CustomError('Comment not found', 404);
  }

  const existingLike = await prisma.commentLike.findUnique({
    where: {
      userId_commentId: {
        userId: user.id,
        commentId
      },
    },
  });

  if (existingLike) {
    return res.status(200).json({
      success: false,
      message: 'User has already liked comment'
    });
  }

  const newLike = await prisma.commentLike.create({
    data: {
      userId: user.id,
      commentId,
    },
  });

  res.status(200).json({
    success: true,
    message: 'Comment successfully liked',
    like: newLike
  });
});

const softDeleteComment = asyncHandler(async (req, res) => {
  const user = req.user;
  const commentId = parseInt(req.params.commentId, 10);

  const comment = await prisma.comment.findUnique({
    where: { id: commentId, isDeleted: false }
  });
  if (!comment) {
    throw new CustomError('Comment not found or already deleted', 404);
  }

  if (comment.userId !== user.id) {
    throw new CustomError('Unauthorized to delete comment', 403);
  }

  await prisma.comment.update({
    where: { id: commentId },
    data: { isDeleted: true }
  });

  res.status(200).json({
    success: true,
    message: 'Comment successfully deleted',
    comment: { id: commentId, content: comment.content, isDeleted: true }
  });
})

module.exports = {
  getPostComments,
  createComment,
  editComment,
  likeComment,
  softDeleteComment
}