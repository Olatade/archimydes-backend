const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var cors = require("cors");


// create the express app
const app = express();

//connect to mongoDB
const dbURI = 'mongodb+srv://general:archimydes@archimydes.uagqk.mongodb.net/archimydes?retryWrites=true&w=majority';

// connect to the database
mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then( result => {
  console.log('connected to database');
})
.catch( err => {
  console.log(err);
});

// const db = mongoose.connection;
// db.once('open', () => {
//   console.log('connected to mongo db')
// })

// middleware
app.use(express.json()); 
app.use(express.urlencoded()); //Parse URL-encoded bodies

// home route
app.get('/', (req, res) =>{
  res.send("Hello world");
})

const UsersRoute = require('./src/routes/Users');
app.use('/users', UsersRoute);


//starting the server
app.listen(3003, console.log('listening on port 3003'))

