const express = require('express');
const router = express.Router();
const { addUser, getUser, getAllUsers, deleteUser, updateUser } = require('../controllers/user-controller');
const { userValidationResult, validateAddUser, validateUpdateUser, checkIfExist} = require('../middlewares/user-validator');

router.get('/', getAllUsers);
router.post('/add-user', validateAddUser, userValidationResult, checkIfExist, addUser);
router.get('/:id', getUser);
router.delete('/delete/:id', deleteUser);
router.patch('/update/:id', validateUpdateUser, userValidationResult, updateUser);

module.exports = router;