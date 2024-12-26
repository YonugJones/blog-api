const prisma = require('../prisma/prismaClient');
const asyncHandler = require('express-async-handler');
const CustomError = require('../errors/customError');

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await prisma.user.findMany({
    select: { id: true, username: true, email: true }
  });

  if (!users) {
    throw new CustomError('Users not found', 404);
  }

  return res.status(200).json(users);
});

const getUser = asyncHandler(async (req, res) => {
  const userId = parseInt(req.params.userId, 10);
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, username: true, email: true, posts: true, comments: true },
  });

  if (!user) {
    throw new CustomError('User not found', 404);
  }

  return res.status(200).json(user)
});

const softDeleteUser = asyncHandler(async (req, res) => {
  const userId = parseInt(req.params.userId, 10);
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, username: true, email: true },
  });

  if (!user) {
    throw new CustomError('User not found', 404);
  };

  await prisma.$transaction([
    prisma.user.update({ where: { id: userId }, data: { isDeleted: true } }),
    prisma.post.updateMany({ where: { authorId: userId }, data: { isDeleted: true } }),
    prisma.comment.updateMany({ where: { userId: userId }, data: { isDeleted: true } })
  ]);

  const updatedUser = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, username: true, email: true, isDeleted: true }
  })

  return res.status(200).json(updatedUser);
});

module.exports = {
  getAllUsers,
  getUser,
  softDeleteUser
};