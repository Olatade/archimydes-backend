const User = require("../models/user");

const createUserData = async (user) => {
  return await User.create(user);
};

const findUserData = async (id) => {
  return await User.findById({_id: id});
}

const allUsers = async() => {
  return await User.find();
}

const deleteUserData = async (id) => {
  return await User.findByIdAndDelete({_id: id});
};


const updateUserData = async (req) => {
  return await User.updateOne({_id: req.params.id}, {$set: req.body})
};


module.exports = {createUserData, findUserData, allUsers, deleteUserData, updateUserData
};
