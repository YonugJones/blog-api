// backend/CommentController
const prisma = require('../prisma/prismaClient');
const asyncHandler = require('express-async-handler');
const CustomError = require('../errors/customError');

const getPostComments = asyncHandler(async (req, res) => {
  const postId = parseInt(req.params.postId, 10);
  const userId = req.user?.userId;
  const post = await prisma.post.findUnique({ where: { id: postId, isDeleted: false } });

  if (!post) {
    throw new CustomError(`Post with id ${postId} not found or has been deleted`, 404);
  }

  const comments = await prisma.comment.findMany({
    where: { postId, isDeleted: false },
    orderBy: { id: 'desc' },
    include: {
      user: { select: { id: true, username: true } },
      _count: { select: { CommentLike: true } },
      CommentLike: { where: { userId } },
    },
  });

  const formattedComments = comments.map((comment) => ({
    id: comment.id,
    content: comment.content,
    createdAt: comment.createdAt,
    isDeleted: comment.isDeleted,
    postId: comment.postId,
    user: comment.user,
    _count: comment._count,
    isLikedByUser: comment.CommentLike.length > 0,
  }));

  res.status(200).json({
    success: true,
    message: comments.length > 0
      ? `Comments for post with id ${postId} retrieved`
      : `No comments for post with id ${postId}`,
    data: formattedComments,
  });
});

const createComment = asyncHandler(async (req, res) => {
  const user = req.user;
  const postId = parseInt(req.params.postId, 10);
  const { content } = req.body;

  const post = await prisma.post.findUnique({ where: { id: postId, isDeleted: false } });
  if (!post) {
    throw new CustomError(`Post with id ${postId} not found or has been deleted`, 404);
  }

  if (!content || content.trim() === '') {
    throw new CustomError('Comment content cannot be empty', 400);
  }

  const newComment = await prisma.comment.create({
    data: { content, postId, userId: user.id },
    select: {
      id: true,
      content: true,
      createdAt: true,
      isDeleted: true,
      postId: true,
      user: { select: { id: true, username: true } },
      _count: { select: { CommentLike: true } },
    },
  });

  res.status(201).json({
    success: true,
    message: 'Comment created successfully',
    data: newComment,
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
    throw new CustomError('Unauthorized to edit comment', 403);
  }

  if (!content || content.trim() === '') {
    throw new CustomError('Content cannot be empty', 400);
  }

  const updatedComment = await prisma.comment.update({
    where: { id: commentId },
    data: { content },
    select: {
      id: true,
      content: true,
      createdAt: true,
      isDeleted: true,
      postId: true,
      user: { select: { id: true, username: true } },
      _count: { select: { CommentLike: true } },
    },
  });

  res.status(200).json({
    success: true,
    message: 'Comment updated successfully',
    data: updatedComment,
  });
});

const likeComment = asyncHandler(async (req, res) => {
  const user = req.user;
  const commentId = parseInt(req.params.commentId, 10);

  const comment = await prisma.comment.findUnique({
    where: { id: commentId },
    include: { user: true, _count: { select: { CommentLike: true } } },
  });

  if (!comment) {
    throw new CustomError('Comment not found', 404);
  }

  const existingLike = await prisma.commentLike.findUnique({
    where: { userId_commentId: { userId: user.id, commentId } },
  });

  if (existingLike) {
    return res.status(200).json({
      success: false,
      message: 'User has already liked this comment',
    });
  }

  await prisma.commentLike.create({ data: { userId: user.id, commentId } });

  const updatedComment = await prisma.comment.findUnique({
    where: { id: commentId },
    include: { _count: { select: { CommentLike: true } } },
  });

  res.status(200).json({
    success: true,
    message: 'Comment liked successfully',
    data: updatedComment,
  });
});

const unlikeComment = asyncHandler(async (req, res) => {
  const user = req.user;
  const commentId = parseInt(req.params.commentId, 10);

  const existingLike = await prisma.commentLike.findUnique({
    where: { userId_commentId: { userId: user.id, commentId } },
  });

  if (!existingLike) {
    return res.status(200).json({
      success: false,
      message: 'User has not liked this comment',
    });
  }

  await prisma.commentLike.delete({
    where: { userId_commentId: { userId: user.id, commentId } },
  });

  const updatedComment = await prisma.comment.findUnique({
    where: { id: commentId },
    include: { _count: { select: { CommentLike: true } } },
  });

  res.status(200).json({
    success: true,
    message: 'Comment unliked successfully',
    data: updatedComment,
  });
});

const softDeleteComment = asyncHandler(async (req, res) => {
  const user = req.user;
  const commentId = parseInt(req.params.commentId, 10);

  const comment = await prisma.comment.findUnique({ where: { id: commentId, isDeleted: false } });
  if (!comment) {
    throw new CustomError('Comment not found or already deleted', 404);
  }

  if (comment.userId !== user.id) {
    throw new CustomError('Unauthorized to delete comment', 403);
  }

  await prisma.comment.update({ where: { id: commentId }, data: { isDeleted: true } });

  res.status(200).json({
    success: true,
    message: 'Comment deleted successfully',
    data: null,
  });
});

const adminSoftDeleteComment = asyncHandler(async (req, res) => {
  if (!req.user.isAdmin) {
    throw new CustomError('Unauthorized to delete comment', 403);
  }

  const commentId = parseInt(req.params.commentId, 10);
  const comment = await prisma.comment.findFirst({ where: { id: commentId, isDeleted: false } });
  if (!comment) {
    throw new CustomError('Comment not found or already deleted', 404);
  }

  await prisma.comment.update({ where: { id: commentId }, data: { isDeleted: true } });

  res.status(200).json({
    success: true,
    message: 'Comment deleted successfully',
  });
});

module.exports = {
  getPostComments,
  createComment,
  editComment,
  likeComment,
  unlikeComment,
  softDeleteComment,
  adminSoftDeleteComment,
};
