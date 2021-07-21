const express = require('express');
const mongoose = require('mongoose');
var cors = require("cors");
const UsersRoute = require('./src/routes/Users');
require("dotenv").config();
const swaggerJsDoc = require('swagger-jsDoc');
const swaggerUI = require('swagger-ui-express');


// create the express app
const app = express();
app.use(cors());

var PORT = process.env.PORT || process.env.NODE_PORT;

// connect to the  database ( mongo db ATLAS)
mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then( result => {
  console.log('connected to database');
  app.listen(PORT, console.log('listening on port 3003'))
})
.catch( err => {
  console.log(err);
});

// generate swagger information
const swaggerOptions = {
  definition: {
    info: {
      title: "Archimydes backend",
      description: "Archimydes node challenge solution",
      version: "1.0.0",
    },
    servers:[`${process.env.HOST_URL}:${process.env.PORT}`]
  },
  apis: ["./src/*.js"],
  // apis: ["./docs/**/*.yaml"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));


// middleware
app.use(express.json()); 
app.use(express.urlencoded()); //Parse URL-encoded bodies

// Routes
app.use('/users', UsersRoute);

// home route
app.get('/', (req, res) =>{
  res.send("Hello world");
})

module.exports = app;