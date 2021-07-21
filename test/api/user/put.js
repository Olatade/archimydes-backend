const app = require('../../../app.js');
const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const userID = '60f750fbd0081d15c44c1dbb';
const { expect } = chai;

describe("Users PATCH test cases", () => {
  it("PATCH /users, edits user name successfully", (done) => {
    const request = {
      "name": "Tise Abiona Updated"
    }

    const returnRequest = {
      "name": "Tise Abiona"
    }

    // update the user
    chai.request(app).patch(`/users/${userID}`).send(request)

    const req = chai.request(app)
      .get(`/users/${userID}`)
      .end((_) => {
        const afterUpdate = req.body.data;
        const newName = afterUpdate.name;
        expect(newName).to.equal(false);
      });

    // return user name back to default state
    chai.request(app).patch(`/users/${userID}`).send(returnRequest);
    done();

  });
});