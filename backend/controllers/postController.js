const prisma = require('../prisma/prismaClient');
const asyncHandler = require('express-async-handler');
const CustomError = require('../errors/customError');

const getAllPosts = asyncHandler(async (req, res) => {
  const posts = await prisma.post.findMany({
    select: {
      title: true,
      content: true,
      author: { select: { username: true }
      },
    },
  });

  if (posts.length === 0) {
    return res.status(200).json({ messsage: 'No posts found', data: [] });
  }

  return res.status(200).json(posts)
});

const getPostById = asyncHandler(async (req, res) => {
  const postId = parseInt(req.params.id, 10);
  const post = await prisma.post.findUnique({
    where: { id: postId },
    select: {
      title: true,
      content: true,
      author: { select: { username: true } },
      comments: { select: {
        content: true,
        user: { select: { username: true } }} 
        }
      }
  });

  if (!post) {
    throw new CustomError('Post not found', 404);
  }

  return res.status(200).json(post);
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
  })

  res.status(201).json(post);
});

const updatePost = asyncHandler(async (req, res) => {
  const user = req.user;
  const postId = parseInt(req.params.id, 10);
  const { title, content } = req.body;

  const post = await prisma.post.findUnique({ where: { id: postId } });
  if (!post) {
    throw new CustomError('Post not found', 404);
  }

  if (post.authorId !== user.id) {
    throw new CustomError('Unauthorized to update post', 403);
  }

  const updatedPost = await prisma.post.update({
    where: { id: postId },
    data: { title, content }
  });

  return res.status(200).json(updatedPost);
});

const sofDeletePost = asyncHandler(async (req, res) => {
  const user = req.user;
  const postId = parseInt(req.params.id, 10);

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
    prisma.comment.updateMany({ where: { postId }, data: { isDeleted: true } })
  ]);

  const deletedPost = await prisma.post.findUnique({
    where: { id: postId },
    select: { title: true, isDeleted: true }
  });

  res.status(200).json({
    success: true,
    message: "Post and associated comments soft deleted",
    post: deletedPost
  });
});

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  sofDeletePost
}
