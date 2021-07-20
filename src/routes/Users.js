const express = require('express');
const router = express.Router();
const User = require('../models/user')
const { addUser, getUser, getAllUsers } = require('../controllers/user-controller')


router.get('/', getAllUsers);
router.post('/add-user', addUser);
router.get('/:id', getUser);


// router.post('/add-user', (req, res) => {
//   const newUser = new User(req.body);
//   newUser.save()
//     .then( result => {
//       res.json(result);
//     })
//     .catch(e =>{
//       console.log(e);
//     })
// })

// router.get('/all-users', (req, res) => {
//   User.find()
//     .then( result => {
//       res.json(result);
//     })
//     .catch(e => {
//       console.log(e);
//     })
// })

// router.get('/single-user', (req, res) => {
//   User.findById('60f73447648bae36f49734a9')
//     .then( result => {
//       res.send(result)
//     })
//     .catch( e => {
//       console.log(e);
//     })
// })

module.exports = router;