const User = require('../models/user')

// create a new user
const addUser = async (req, res) => {
  const newUser = new User(req.body);
  const savedUser = await newUser.save().catch( e =>{
    console.log(e)
  });

  res.json(savedUser);
}

// get a single user
const getUser = async (req, res) => {
  const user = await User.findById({_id: req.params.id}).catch( e =>{
    console.log(e)
  });

  res.json(user);
}

// get all users
const getAllUsers = async (req, res) => {
  const user = await User.find().catch( e =>{
    console.log(e)
  });
  
  res.json(user);
}

// delete a user
const deleteUser = async (req, res) => {
  const result = await User.findByIdAndDelete({_id: req.params.id}).catch( e =>{
    console.log(e)
  });

  res.json(result);
}

// update a user
const updateUser = async(req, res) => {
  const updatedUser = await User.updateOne({_id: req.params.id}, {$set: req.body}).catch( e =>{
    console.log(e)
  });
  res.json(updatedUser);
}

module.exports = {addUser, getUser, getAllUsers, deleteUser, updateUser};