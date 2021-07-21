const User = require('../models/user')

const { check, validationResult } = require('express-validator');

function respond (status, message, data = []){
  // exclude data from response if it's empty
  if (data.length < 1){
    return {status, message};
  }else{
    return {status, message, data};
  }
};

exports.userValidationResult = (req, res, next) => {
  const result = validationResult(req)
  if(!result.isEmpty()){
    const error = result.array()[0].msg;
    return res.status(422).json(respond(false, error))
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

exports.checkIfExist = async (req, res, next) => {
  const user = await User.findOne({email: req.body.email});
  if(user) return res.status(400).send(respond(false, 'A user with sent email exists'));
  next()
}