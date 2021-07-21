const express = require('express');
const mongoose = require('mongoose');
var cors = require("cors");
const UsersRoute = require('./src/routes/Users');

// create the express app
const app = express();
app.use(cors());

//connect to mongoDB
const dbURI = 'mongodb+srv://general:archimydes@archimydes.uagqk.mongodb.net/archimydes?retryWrites=true&w=majority';

// connect to the database
mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then( result => {
  console.log('connected to database');
  app.listen(3003, console.log('listening on port 3003'))
})
.catch( err => {
  console.log(err);
});


// middleware
app.use(express.json()); 
app.use(express.urlencoded()); //Parse URL-encoded bodies

app.use('/users', UsersRoute);

// home route
app.get('/', (req, res) =>{
  res.send("Hello world");
})

module.exports = app;