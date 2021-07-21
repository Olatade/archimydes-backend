const express = require('express');
const router = express.Router();
const { addUser, getUser, getAllUsers, deleteUser, updateUser } = require('../controllers/user-controller');
const { userValidationResult, validateAddUser, validateUpdateUser} = require('../middlewares/user-validator');
const { checkIfExist, checkUpdatePossible} = require ('../middlewares/user');


/**
 * @swagger
 * /users:
 * get:
 *  description: use to request all users
 *  responses: 
 *    '200':
 *      description: A successful response
 */
router.get('/', getAllUsers);

/**
 * @swagger
 * /users:
 * post:
 *  description: used to create a new user
 *  responses: 
 *    '201':
 *      description: A successful response
 */
router.post('/', validateAddUser, userValidationResult, checkIfExist, addUser);

/**
 * @swagger
 * /users/:id:
 * get:
 *  description: used to get a single user
 *  responses: 
 *    '200':
 *      description: A successful response
 */
router.get('/:id', getUser);

/**
 * @swagger
 * /users/:id:
 * delete:
 *  description: used to delete a user
 *  responses: 
 *    '200':
 *      description: A successful response
 */
router.delete('/:id', deleteUser);

/**
 * @swagger
 * /users/:id:
 * patch:
 *  description: used to update a user
 *  responses: 
 *    '200':
 *      description: A successful response
 */
router.patch('/:id', validateUpdateUser, userValidationResult, checkUpdatePossible, updateUser);

module.exports = router;