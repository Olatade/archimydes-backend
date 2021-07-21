const app = require('../../../app.js');
const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const { expect } = chai;

describe("Users GET Test Cases", () => {
  it("GET /users, gets array of users", async () => {
    chai.request(app)
      .get("/users")
      .end((_, res) => {
        expect(res.status).to.equal(200);
        const users = res.body.data;
        expect(Array.isArray(users));
        done();
      });

  });

  it("GET /users, returns a users array where each item contains id, name, email and role", async () => {
    chai.request(app)
      .get("/users")
      .end((_, res) => {
        expect(res.status).to.equal(200);

        const users = res.body.data;
        const user = users[0];

        expect(user).to.contain.property("_id");
        expect(user).to.contain.property("name");
        expect(user).to.contain.property("email");
        expect(user).to.contain.property("role");
        done();
      });

  });

  it("GET /users/:id,  returns a single user with a status of true", async () => {
    chai.request(app)
      .get("/users")
      .end((_, res) => {
        expect(res.status).to.equal(200);

        const users = res.body.data;

        expect(res.body.status).to.equal(true);
        done();
      });

  });

  it("GET /users/:id,  returns a single user with id, name and role", async () => {

    const userID = '60f8232968b86a033cef5a35';
    chai.request(app)
      .get(`/users/${userID}`)
      .end((_, res) => {
        expect(res.status).to.equal(200);

        const user = res.body.data;
        expect(user).to.contain.property("_id");
        expect(user).to.contain.property("name");
        expect(user).to.contain.property("email");
        expect(user).to.contain.property("role");
        done();
      });

  });
});