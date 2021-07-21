
const { check, validationResult } = require('express-validator');
const { respond } = require('../functions/functions');


exports.userValidationResult = (req, res, next) => {
  const result = validationResult(req)
  if(!result.isEmpty()){
    const error = result.array()[0].msg;
    return res.status(400).json(respond(false, error))
  }

  next();
}

// validate user addition
exports.validateAddUser = [
  check('name').trim().not().isEmpty().withMessage('Name is required')
  .isLength({min: 3, max: 50 }).withMessage('First name must be 3 to 50 characters long'),

  check('email').trim().not().isEmpty().withMessage('Email is required')
  .isLength({min: 5, max: 70 }).withMessage('Email must be 3 to 50 characters long')
  .isEmail().withMessage('Email not valid'),

  check('role').trim().not().isEmpty().withMessage('Role is required')
  .isIn(['Admin', 'User']).withMessage('Role can be either Admin or User')
]

// validate user addition
exports.validateUpdateUser = [
  check('name').optional().trim().not().isEmpty().withMessage('Name is required')
  .isLength({min: 3, max: 50 }).withMessage('First name must be 3 to 50 characters long'),

  check('email').optional().trim().not().isEmpty().withMessage('Email is required')
  .isLength({min: 5, max: 70 }).withMessage('Email must be 3 to 50 characters long')
  .isEmail().withMessage('Email not valid'),

  check('role').optional().trim().not().isEmpty().withMessage('Role is required')
  .isIn(['Admin', 'User']).withMessage('Role can be either Admin or User')
]