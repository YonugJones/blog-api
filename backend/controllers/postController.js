const prisma = require('../prisma/prismaClient');
const asyncHandler = require('express-async-handler');
const CustomError = require('../errors/customError');

const getAllPosts = asyncHandler(async (req, res) => {
  const posts = await prisma.post.findMany({
    where: { isDeleted: false },
    select: {
      id: true,
      title: true,
      content: true,
      createdAt: true,
      author: { select: { id: true, username: true } },
    },
  });

  if (posts.length === 0) {
    return res.status(200).json({ messsage: 'No posts found', data: [] });
  }

  return res.status(200).json({
    success: true,
    message: 'All posts retrieved',
    posts: posts
  })
});

const getPostById = asyncHandler(async (req, res) => {
  const postId = parseInt(req.params.postId, 10);
  const post = await prisma.post.findUnique({
    where: { id: postId, isDeleted: false },
    select: {
      id: true,
      title: true,
      content: true,
      createdAt: true,
      author: { select: { id: true, username: true } },
    }
  });

  if (!post) {
    throw new CustomError('Post not found', 404);
  }

  return res.status(200).json({
    success: true,
    message: 'Post retrieved',
    post: post
  });
});

const createPost = asyncHandler(async (req, res) => {
  const user = req.user;
  if (!user) {
    throw new CustomError('Unauthorized, user not authenticated', 401);
  }

  const { title, content } = req.body;
  if (!title || !content) {
    throw new CustomError('Post must have title and content', 400);
  }

  const post = await prisma.post.create({
    data: {
      title,
      content,
      authorId: user.id,
    }
  });

  res.status(201).json(post);
});

const editPost = asyncHandler(async (req, res) => {
  const user = req.user;
  const postId = parseInt(req.params.postId, 10);
  const post = await prisma.post.findUnique({ where: { id: postId } });
  const { title, content } = req.body;
  if (!user) {
    throw new CustomError('Unauthorized, user not authenticated', 401);
  }

  if (!post) {
    throw new CustomError('Post not found', 404);
  }

  if (!title || !content) {
    throw new CustomError('Post must have title and content', 400);
  }

  if (post.authorId !== user.id) {
    throw new CustomError('Unauthorized to edit post', 403);
  }

  const updatedPost = await prisma.post.update({
    where: { id: postId },
    data: { title, content }
  });

  return res.status(200).json({
    success: true,
    message: 'Post updated',
    post: updatedPost
  });
});

const softDeletePost = asyncHandler(async (req, res) => {
  const user = req.user;
  const postId = parseInt(req.params.postId, 10);

  const post = await prisma.post.findUnique({
    where: { id: postId },
    select: { title: true, authorId: true }
  });
  if (!post) {
    throw new CustomError('Post not found', 404);
  }

  if (post.authorId !== user.id) {
    throw new CustomError('Unauthorized to delete this post', 403);
  }

  await prisma.$transaction([
    prisma.post.update({ where: { id: postId }, data: { isDeleted: true } }),
    prisma.comment.updateMany({ where: { postId: postId }, data: { isDeleted: true } })
  ]);

  const deletedPost = await prisma.post.findUnique({
    where: { id: postId },
    select: { title: true, isDeleted: true }
  });

  res.status(200).json({
    success: true,
    message: 'Post and associated comments soft deleted',
    post: deletedPost
  });
});

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  editPost,
  softDeletePost
}
