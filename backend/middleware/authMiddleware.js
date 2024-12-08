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
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log("Decoded User: ", req.user);  // Log decoded user
    next();
  } catch (err) {
    if (err instanceof jwt.ExpiredError) {
      throw new CustomError('Forbidden: token has expired', 403)
    } else {
      throw new CustomError('Unauthorized: invalid token', 401)
    }
  }
});

const authorizeAdmin = asyncHandler(async (req, res, next) => {
  const isAdmin = req.user.isAdmin;
  if (!isAdmin) {
    throw new CustomError('Access denied', 403);
  }
  next();
});

module.exports = {
  authenticateToken,
  authorizeAdmin
};