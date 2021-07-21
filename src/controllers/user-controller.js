const User = require('../models/user')
const { respond } = require('../functions/functions');
const {createUserData, findUserData, allUsers, deleteUserData, updateUserData} = require ('../services/user');

// create a new user
const addUser = async (req, res) => {
  try{
    const user = await createUserData(req.body);
    res.status(201).json(respond(true, 'User created', user));
  }
  catch(e){
    res.status(500).json(respond(false, 'Error creating user'));
    console.log(e);
  }
}

// get a single user
const getUser = async (req, res) => {
  try{
    const user = await findUserData(req.params.id);
    res.status(200).json(respond(true, 'User retrieved', user));
  }
  catch(e){
    res.status(500).json(respond(false, 'Error retrieving user'));
    console.log(e);
  }
}

// get all users
const getAllUsers = async (req, res) => {
  try{
    const users = await allUsers();
    res.status(202).json(respond(true, 'Users retrieved', users));
  }
  catch(e){
    res.status(500).json(respond(false, 'Error retrieving users'));
    console.log(e);
  }
}

// delete a user
const deleteUser = async (req, res) => {
  try{
    const result = await deleteUserData(req.params.id);
    res.status(202).json(respond(true, 'User deleted', result));
  }
  catch(e){
    res.status(500).json(respond(false, 'Error deleting user'));
    console.log(e);
  }
}

// update a user
const updateUser = async(req, res) => {
  try{
    // const updatedUser = await User.updateOne({_id: req.params.id}, {$set: req.body});
    const updatedUser = await updateUserData(req);
    res.status(202).json(respond(true, 'User updated', updatedUser));
  }
  catch(e){
    res.status(500).json(respond(false, 'User update failed'));
    console.log(e);
  }
  
}

module.exports = {addUser, getUser, getAllUsers, deleteUser, updateUser};