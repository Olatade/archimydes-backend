# Archimydes Challenge backend nodejs
This is a solution to the backend (node js) challenge by Archimydes. This api is designed to work with [Archimydes Challenge front-end](https://github.com/Olatade/archimydes-frontend) 

## Steps to install and run code
- git clone https://github.com/Olatade/archimydes-backend.git archimydes-backend
- cd archimydes-backend
- npm install
  ( node v14.17.1 ) (npm 6.14.13)
- npm run start

## Database connection
- This project connects directly to a mongoDB Atlas Database. you will find the schema in src > models > user.js
- The database URI is sored in /.env along with the host url
- on successful connection to the database, the terminal outputs:

`connected to database`

`listening on port 3003`

All routes can then be accessed on http://localhost:3003/users

## Route testing
A combination of chai, chai-http and mocha were used in testing. testing was done on the database because of it's small size.

You can test routes directly on POSTMAN or `run test` in the terminal

## Validation
I found writing validation most interesting with the use of [express-validator](https://express-validator.github.io/docs/) i was able to check for user errors before adding data to the database

## Improvements
API documentation needs some work. Swagger-js-docs were included in routes, but api doc generation needs to be paid more attention.

