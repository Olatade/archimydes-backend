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



module.exports = {addUser, getUser, getAllUsers};