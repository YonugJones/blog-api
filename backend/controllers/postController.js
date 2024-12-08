const prisma = require('../prisma/prismaClient');
const asyncHandler = require('express-async-handler');
const CustomError = require('../errors/customError');

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
  createPost
}
