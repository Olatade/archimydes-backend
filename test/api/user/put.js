process.env.NODE_ENV = "test";

const app = require('../../../app.js');

const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
require("dotenv").config();

const userID = '60f750fbd0081d15c44c1dbb';
const { assert, should, expect } = chai;
describe("Users PATCH test cases", () => {
  it("PATCH /users, edits user name successfully", async () => {
    const request = {
      "name": "Tise Abiona Updated"
    }

    const returnRequest = {
      "name": "Tise Abiona"
    }

    // update the user
    await chai.request(`${process.env.HOST_URL}:${process.env.NODE_PORT}`)
      .patch(`/users/${userID}`).send(request)
      
     async ()=>{
        // get the user details again
        const req = await chai.request(`${process.env.HOST_URL}:${process.env.NODE_PORT}`)
        .get(`/users/${userID}`)
        
        const afterUpdate =  req.body.data;
        const newName = afterUpdate.name;
        expect(newName).to.equal(request.name);
      }


    // return user name back to default state
    await chai.request(`${process.env.HOST_URL}:${process.env.NODE_PORT}`)
    .patch(`/users/${userID}`).send(returnRequest);

  });
});
