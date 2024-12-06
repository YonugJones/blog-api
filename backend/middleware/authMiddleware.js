require('dotenv').config();
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const CustomError = require('../errors/customError');

const authenticateToken = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new CustomError('Unauthorized no token provided', 401);
  }

  const token = authHeader.split(' ')[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = decoded;
  next();
});

module.exports = authenticateToken;