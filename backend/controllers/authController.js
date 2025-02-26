require('dotenv').config();
const prisma = require('../prisma/prismaClient');
const asyncHandler = require('express-async-handler');
const CustomError = require('../errors/customError');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const signup = asyncHandler(async (req, res) => {
  const { username, email, password, isAdmin = false } = req.body;

  const checkUsername = await prisma.user.findUnique({ where: { username }});
  if (checkUsername) {
    throw new CustomError('Username is taken', 409);
  };

  const checkEmail = await prisma.user.findUnique({ where: { email } });
  if (checkEmail) {
    throw new CustomError('Account with provided credentials already exists', 409);
  };

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
      isAdmin
    },
  });

  res.status(201).json({
    success: true,
    data: {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email
    },
  });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new CustomError('Incorrect email', 401);
  };

  const deletedUser = await prisma.user.findFirst({ where: { email, isDeleted: true } });
  if (deletedUser) {
    throw new CustomError('User has been deleted. Please contact admin for assistance', 401);
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new CustomError('Incorrect password', 401);
  };

  if (!process.env.JWT_SECRET) {
    throw new CustomError('JWT_SECRET is not defined', 500);
  }

  const token = jwt.sign(
    { id: user.id, username: user.username, email: user.email, isAdmin: user.isAdmin },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRY || '1h' }
  );

  res.status(200).json({
    success: true,
    message: 'Welcome back ' + user.username,
    token,
    user: { id: user.id, username: user.username, email: user.email }
  })
});

module.exports = {
  signup,
  login
}