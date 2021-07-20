const User = require('../models/user')

const addUser = async (req, res) => {
  const newUser = new User(req.body);
  const savedUser = await newUser.save().catch( e =>{
    console.log(e)
  });
  res.json(savedUser);
}

module.exports = {addUser};