const prisma = require('../prisma/prismaClient');
const asyncHandler = require('express-async-handler');
const CustomError = require('../errors/customError');
const bcrypt = require('bcryptjs');

const signup = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  const checkUsername = await prisma.user.findUnique({ where: { username }});
  if (checkUsername) {
    throw new CustomError(409, 'Username is taken');
  };

  const checkEmail = await prisma.user.findUnique({ where: { email } });
  if (checkEmail) {
    throw new CustomError(409, 'Email is taken');
  };

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    username,
    email,
    password: hashedPassword
  })

  res.status(201).json({
    success: true,
    data: {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email
    },
  });
});

module.exports = {
  signup
}