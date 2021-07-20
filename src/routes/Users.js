const express = require('express');
const router = express.Router();
const User = require('../models/user')

//get all routes
router.get('/', (req, res) => {
  res.send('showing all users');
})

router.post('/add-user', (req, res) => {
  const newUser = new User(req.body);
  newUser.save()
    .then( result => {
      res.json(result);
    })
    .catch(e =>{
      console.log(e);
    })
  // const savedUser = await newUser.save();
  // res.json(savedUser);
})

router.get('/all-users', (req, res) => {
  User.find()
    .then( result => {
      res.json(result);
    })
    .catch(e => {
      console.log(e);
    })
})

router.get('/single-user', (req, res) => {
  User.findById('60f73447648bae36f49734a9')
    .then( result => {
      res.send(result)
    })
    .catch( e => {
      console.log(e);
    })
})

module.exports = router;