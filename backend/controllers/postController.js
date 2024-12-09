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

  console.log("Post Author ID: ", post.authorId, "Logged-in User ID: ", user.id);

  if (post.authorId !== user.id) {
    throw new CustomError('Unauthorized to update post', 403);
  }

  const updatedPost = await prisma.post.update({
    where: { id: postId },
    data: { title, content }
  });

  return res.status(200).json(updatedPost);
});

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost
}
