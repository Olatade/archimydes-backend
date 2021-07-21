const express = require('express');
const router = express.Router();
const { addUser, getUser, getAllUsers, deleteUser, updateUser } = require('../controllers/user-controller');
const { userValidationResult, validateAddUser, validateUpdateUser} = require('../middlewares/user-validator');
const { checkIfExist} = require ('../middlewares/user');

router.get('/', getAllUsers);
router.post('/', validateAddUser, userValidationResult, checkIfExist, addUser);
router.get('/:id', getUser);
router.delete('/:id', deleteUser);
router.patch('/:id', validateUpdateUser, userValidationResult, updateUser);

module.exports = router;