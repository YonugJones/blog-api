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

module.exports = {
  getAllPosts,
  getPostById,
  createPost
}
