process.env.NODE_ENV = "test";

const app = require('../../../app.js');

const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
require("dotenv").config();


const { assert, should, expect } = chai;
describe("Users POST test cases", () => {
  it("POST /users, adds a new user to the database", async () => {
    const request = {
      name: 'random user',
      email: 'random@gmail.com',
      role: 'Admin'
    }
    const res = await chai.request(`${process.env.HOST_URL}:${process.env.NODE_PORT}`)
      .post("/users")
      .send(request);

    expect(res.status).to.equal(201);

    const status = res.body.status;
    const tempUserId = res.body.data['_id'];
    expect(status).to.equal(true);

    // delete the created user
    if(status === true){
      await chai.request(`${process.env.HOST_URL}:${process.env.NODE_PORT}`)
      .delete(`/users/${tempUserId}`)
    }

  });

  it("POST /users, returns 400 status code when name is too short", async () => {
    const request = {
      name: 'r',
      email: 'random@gmail.com',
      role: 'Admin'
    }
    const res = await chai.request(`${process.env.HOST_URL}:${process.env.NODE_PORT}`)
      .post("/users")
      .send(request);

    expect(res.status).to.equal(400);
    expect(res.body.status).to.equal(false);
    expect(res.body.message).to.equal('First name must be 3 to 50 characters long');
  });

  it("POST /users, returns 400 status code when email is invalid", async () => {
    const request = {
      name: 'random user',
      email: 'randomgmail.com',
      role: 'Admin'
    }
    const res = await chai.request(`${process.env.HOST_URL}:${process.env.NODE_PORT}`)
      .post("/users")
      .send(request);

    expect(res.status).to.equal(400);
    expect(res.body.status).to.equal(false);
    expect(res.body.message).to.equal('Email not valid');
  });

  it("POST /users, ensures role is either admin or user", async () => {
    const request = {
      name: 'random user',
      email: 'random@gmail.com',
      role: 'something'
    }
    const res = await chai.request(`${process.env.HOST_URL}:${process.env.NODE_PORT}`)
      .post("/users")
      .send(request);

    expect(res.status).to.equal(400);
    expect(res.body.status).to.equal(false);
    expect(res.body.message).to.equal('Role can be either Admin or User');
  });

  it("POST /users, checks if name is present in request", async () => {
    const request = {
      email: 'random@gmail.com',
      role: 'something'
    }
    const res = await chai.request(`${process.env.HOST_URL}:${process.env.NODE_PORT}`)
      .post("/users")
      .send(request);

    expect(res.status).to.equal(400);
    expect(res.body.status).to.equal(false);
    expect(res.body.message).to.equal('Name is required');
  });

  it("POST /users, checks if email is present in request", async () => {
    const request = {
      name: 'random user',
      role: 'Admin'
    }
    const res = await chai.request(`${process.env.HOST_URL}:${process.env.NODE_PORT}`)
      .post("/users")
      .send(request);

    expect(res.status).to.equal(400);
    expect(res.body.status).to.equal(false);
    expect(res.body.message).to.equal('Email is required');
  });

  it("POST /users, checks if role is present in request", async () => {
    const request = {
      name: 'random user',
      email: 'random@gmail.com',
    }
    const res = await chai.request(`${process.env.HOST_URL}:${process.env.NODE_PORT}`)
      .post("/users")
      .send(request);

    expect(res.status).to.equal(400);
    expect(res.body.status).to.equal(false);
    expect(res.body.message).to.equal('Role is required');
  });
});
