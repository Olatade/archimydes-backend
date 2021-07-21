process.env.NODE_ENV = "test";

const app = require('../../../app.js');

const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
require("dotenv").config();

const { assert, should, expect } = chai;
describe("Users GET Test Cases", () => {
  it("GET /users, gets array of users", async () => {
    const res = await chai.request(`${process.env.HOST_URL}:${process.env.NODE_PORT}`).get("/users");
    expect(res.status).to.equal(200);

    const users = res.body.data;
    expect(Array.isArray(users));
  });

  it("GET /users, returns a users array where each item contains id, name, email and role", async () => {
    const res = await chai.request(`${process.env.HOST_URL}:${process.env.NODE_PORT}`).get("/users");
    expect(res.status).to.equal(200);

    const users = res.body.data;
    const user = users[0];

    expect(user).to.contain.property("_id");
    expect(user).to.contain.property("name");
    expect(user).to.contain.property("email");
    expect(user).to.contain.property("role");
  });

  it("GET /users/:id,  returns a single user with a status of true", async () => {
    const res = await chai.request(`${process.env.HOST_URL}:${process.env.NODE_PORT}`).get("/users");
    expect(res.status).to.equal(200);

    const users = res.body.data;
    const user = users[0];

    expect(res.body.status).to.equal(true);
  });

  it("GET /users/:id,  returns a single user with id, name and role", async () => {

    const userID = '60f750fbd0081d15c44c1dbb';
    const res = await chai.request(`${process.env.HOST_URL}:${process.env.NODE_PORT}`).get(`/users/${userID}`);
    expect(res.status).to.equal(200);

    const user = res.body.data;
    expect(user).to.contain.property("_id");
    expect(user).to.contain.property("name");
    expect(user).to.contain.property("email");
    expect(user).to.contain.property("role");
  });
});
