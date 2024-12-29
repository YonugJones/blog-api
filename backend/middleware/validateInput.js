const { body, validationResult } = require('express-validator');

const validateSignup = [
  body('username')
    .notEmpty()
    .withMessage('Username is required')
    .isLength({ min: 3 })
    .withMessage('Username must be at least 3 characters long'),
  body('email')
    .isEmail()
    .withMessage('Invalid email address'),
  body('password')
    .isLength({ min: 10 })
    .withMessage('Password must be at least 10 characters')
    .matches(/[A-Z]/)
    .withMessage('Password must contain at least one uppercase letter')
    .matches(/[a-z]/)
    .withMessage('Password must contain at least one lowercase letter')
    .matches(/[0-9]/)
    .withMessage('Password must contain at least one number')
    .matches(/[^A-Za-z0-9]/)
    .withMessage('Password must contain at least one special character'),
  body('confirmPassword')
  .custom((value, { req }) => value === req.body.password)
  .withMessage('Passwords must match'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors.array());
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
  },
];

const validateLogin = [
  body('email')
    .notEmpty()
    .withMessage('Email address is blank')
    .isEmail()
    .withMessage('Email address invalid'),
  body('password')
    .notEmpty()
    .withMessage('Password required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
  },
];

module.exports = { 
  validateSignup,
  validateLogin
};