const app = require('../../../app.js');
const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const { expect } = chai;

describe("Users POST test cases", () => {

  it("POST /users, adds a new user to the database", (done) => {
    const request = {
      name: 'random user',
      email: 'random@gmail.com',
      role: 'Admin'
    }
    chai.request(app)
      .post("/users")
      .send(request)
      .end((_, res) => {
        expect(res.status).to.equal(201);
        const status = res.body.status;
        const tempUserId = res.body.data['_id'];
        expect(status).to.equal(true);
        // delete the created user
        if (status === true) {
          chai.request(app)
            .delete(`/users/${tempUserId}`)
        }
      });
    done();

  });

  it("POST /users, returns 400 status code when name is too short", (done) => {
    const request = {
      name: 'r',
      email: 'random@gmail.com',
      role: 'Admin'
    }
    chai.request(app)
      .post("/users")
      .send(request)
      .end((_, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal(false);
        expect(res.body.message).to.equal('First name must be 3 to 50 characters long');
        done();
      });

  });

  it("POST /users, returns 400 status code when email is invalid", (done) => {
    const request = {
      name: 'random user',
      email: 'randomgmail.com',
      role: 'Admin'
    }
    chai.request(app)
      .post("/users")
      .send(request)
      .end((_, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal(false);
        expect(res.body.message).to.equal('Email not valid');
        done();
      });
  });

  it("POST /users, ensures role is either admin or user", (done) => {
    const request = {
      name: 'random user',
      email: 'random@gmail.com',
      role: 'something'
    }
    chai.request(app)
      .post("/users")
      .send(request)
      .end((_, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal(false);
        expect(res.body.message).to.equal('Role can be either Admin or User');
        done();
      });
  });

  it("POST /users, checks if name is present in request", (done) => {
    const request = {
      email: 'random@gmail.com',
      role: 'something'
    }
    chai.request(app)
      .post("/users")
      .send(request)
      .end((_, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal(false);
        expect(res.body.message).to.equal('Name is required');
        done();
      });

  });

  it("POST /users, checks if email is present in request", (done) => {
    const request = {
      name: 'random user',
      role: 'Admin'
    }
    chai.request(app)
      .post("/users")
      .send(request)
      .end((_, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal(false);
        expect(res.body.message).to.equal('Email is required');
        done();
      });
  });

  it("POST /users, checks if role is present in request", (done) => {
    const request = {
      name: 'random user',
      email: 'random@gmail.com',
    }
    chai.request(app)
      .post("/users")
      .send(request)
      .end((_, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal(false);
        expect(res.body.message).to.equal('Role is required');
        done();
      });
  });
});