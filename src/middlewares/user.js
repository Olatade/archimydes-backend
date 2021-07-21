const User = require('../models/user')
const {respond} = require('../functions/functions');

exports.checkIfExist = async (req, res, next) => {
  const user = await User.findOne({email: req.body.email});
  if(user) return res.status(400).send(respond(false, 'A user with sent email exists'));
  next()
}

exports.checkUpdatePossible = async (req, res, next) => {
  const user = await User.findById({_id: req.params.id});
  if(!user) return res.status(400).send(respond(false, 'User not found'));
  next()
}