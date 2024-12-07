const prisma = require('../prisma/prismaClient');
const asyncHandler = require('express-async-handler');
const CustomError = require('../errors/customError');

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      username: true,
      email: true,
    },
  });

  return res.status(200).json(users);
});

const getUser = asyncHandler(async (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, username: true, email: true, posts: true, comments: true },
  });
  if (!user) {
    throw new CustomError('User not found', 404);
  }

  return res.status(200).json(user)
});

module.exports = {
  getAllUsers,
  getUser
}