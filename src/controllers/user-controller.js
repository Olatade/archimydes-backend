const User = require('../models/user')

function respond (status, message, data){
  return {status, message, data,};
};

// create a new user
const addUser = async (req, res) => {
  const newUser = new User(req.body);
  const savedUser = await newUser.save().catch( e =>{
    console.log(e)
  });

  res.status(200).json(respond(true, 'User created', savedUser));
}

// get a single user
const getUser = async (req, res) => {
  const user = await User.findById({_id: req.params.id}).catch( e =>{
    console.log(e)
  });

  res.status(200).json(respond(true, 'User retrieved', user));
}

// get all users
const getAllUsers = async (req, res) => {
  const user = await User.find().catch( e =>{
    console.log(e)
  });
  
  res.status(202).json(respond(true, 'Users retrieved', user));
}

// delete a user
const deleteUser = async (req, res) => {
  const result = await User.findByIdAndDelete({_id: req.params.id}).catch( e =>{
    console.log(e)
  });

  res.status(202).json(respond(true, 'User deleted', result));
}

// update a user
const updateUser = async(req, res) => {
  const updatedUser = await User.updateOne({_id: req.params.id}, {$set: req.body}).catch( e =>{
    console.log(e)
  });

  res.status(202).json(respond(true, 'User updated', updatedUser));
}

module.exports = {addUser, getUser, getAllUsers, deleteUser, updateUser};