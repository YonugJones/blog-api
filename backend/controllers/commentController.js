const prisma = require('../prisma/prismaClient');
const asyncHandler = require('express-async-handler');
const CustomError = require('../errors/customError');

const getCommentsFromPost = asyncHandler(async (req, res) => {
  // const postId = parseInt(req.params.id, 10);
  // const comments = await prisma.comment.findMany({
  //   where: { isDeleted: false },
  //   select: {
  //     content: true, 
  //     user: { select: { username: true } }
  //   }
  // });
  // if (comments.length === 0) {
  //   return res.status(200).json({ messsage: 'No comments found', data: [] });
  // }

  // res.status(200).json({
  //   succes: true,
  //   message: 'All comments retrieved',
  //   comments: comments
  // });
  console.log('getCommentsFromPost');
});

module.exports = {
  getCommentsFromPost
}