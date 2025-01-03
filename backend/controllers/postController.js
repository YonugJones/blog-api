const prisma = require('../prisma/prismaClient');
const asyncHandler = require('express-async-handler');
const CustomError = require('../errors/customError');

const getAllPosts = asyncHandler(async (req, res) => {
  const posts = await prisma.post.findMany({
    where: { isDeleted: false },
    orderBy: { id: 'desc' },
    select: {
      id: true,
      title: true,
      content: true,
      imageUrl: true,
      createdAt: true,
      author: { select: { id: true, username: true } },
    },
  });

  res.status(200).json({
    success: true,
    message: posts.length > 0 ? 'All posts retrieved' : 'No posts found',
    data: posts,
  });
});

const getPostById = asyncHandler(async (req, res) => {
  const postId = parseInt(req.params.postId, 10);
  const post = await prisma.post.findUnique({
    where: { id: postId, isDeleted: false },
    select: {
      id: true,
      title: true,
      content: true,
      imageUrl: true,
      createdAt: true,
      author: { select: { id: true, username: true } },
    },
  });

  if (!post) {
    throw new CustomError('Post not found', 404);
  }

  res.status(200).json({
    success: true,
    message: 'Post retrieved successfully',
    data: post,
  });
});

const createPost = asyncHandler(async (req, res) => {
  const user = req.user;
  if (!user) {
    throw new CustomError('Unauthorized, user not authenticated', 401);
  }

  const { title, content, imageUrl } = req.body;
  if (!title || !content) {
    throw new CustomError('Post must have title and content', 400);
  }

  const post = await prisma.post.create({
    data: {
      title,
      content,
      imageUrl,
      authorId: user.id,
    },
    select: {
      id: true,
      title: true,
      content: true,
      imageUrl: true,
      createdAt: true,
      author: { select: { id: true, username: true } },
    },
  });

  res.status(201).json({
    success: true,
    message: 'Post created successfully',
    data: post,
  });
});

const editPost = asyncHandler(async (req, res) => {
  const user = req.user;
  const postId = parseInt(req.params.postId, 10);
  const { title, content, imageUrl } = req.body;

  if (!user) {
    throw new CustomError('Unauthorized, user not authenticated', 401);
  }

  const post = await prisma.post.findUnique({ where: { id: postId } });
  if (!post) {
    throw new CustomError('Post not found', 404);
  }

  if (post.authorId !== user.id) {
    throw new CustomError('Unauthorized to edit this post', 403);
  }

  if (!title || !content) {
    throw new CustomError('Post must have title and content', 400);
  }

  const updatedPost = await prisma.post.update({
    where: { id: postId },
    data: { title, content, imageUrl },
    select: {
      id: true,
      title: true,
      content: true,
      imageUrl: true,
      createdAt: true,
      author: { select: { id: true, username: true } },
    },
  });

  res.status(200).json({
    success: true,
    message: 'Post updated successfully',
    data: updatedPost,
  });
});

const softDeletePost = asyncHandler(async (req, res) => {
  const user = req.user;
  const postId = parseInt(req.params.postId, 10);

  const post = await prisma.post.findUnique({
    where: { id: postId },
    select: { title: true, authorId: true },
  });

  if (!post) {
    throw new CustomError('Post not found', 404);
  }

  if (post.authorId !== user.id) {
    throw new CustomError('Unauthorized to delete this post', 403);
  }

  await prisma.$transaction([
    prisma.post.update({ where: { id: postId }, data: { isDeleted: true } }),
    prisma.comment.updateMany({ where: { postId }, data: { isDeleted: true } }),
  ]);

  res.status(200).json({
    success: true,
    message: 'Post and associated comments soft deleted',
    data: { id: postId, title: post.title, isDeleted: true },
  });
});

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  editPost,
  softDeletePost,
};
