const supertest = require('supertest');
const should = require('should');
const app = require('../../server');

let token;
let id;

describe('Users API test', function () {
  this.timeout(120000);

  it('should register a user', (done) => {
    const newUser = {
      firstName: 'joe',
      lastName: 'bloggs',
      email: 'jbloggs@mail.ie',
      password: 'password1',
    };

    supertest(app)
      .post('/api/v1/users')
      .send(newUser)
      .expect('Content-type', /json/)
      .expect(201) // This is the HTTP response
      .then((res) => {
        res.should.have.property('status').equal(201);
        done();
      })
      .catch((err) => done(err));
  });

  it('should login a user', (done) => {
    const user = {
      email: 'jbloggs@mail.ie',
      password: 'password1',
    };

    supertest(app)
      .post('/api/v1/user')
      .send(user)
      .expect('Content-type', /json/)
      .expect(200) // This is the HTTP response
      .then((res) => {
        res.should.have.property('status').equal(200);
        should.exist(res.body.token);
        id = res.body.id;
        token = `Bearer: ${res.body.token}`;
        done();
      })
      .catch((err) => done(err));
  });

  it('should not get a user by ID without a token', (done) => {
    supertest(app)
      .get(`/api/v1/user/${id}`)
      .expect('Content-type', /json/)
      .expect(401) // This is the HTTP response
      .then((res) => {
        res.should.have.property('status').equal(401);
        done();
      })
      .catch((err) => done(err));
  });

  it('should get a user by ID', (done) => {
    supertest(app)
      .get(`/api/v1/user/${id}`)
      .set('Authorization', token)
      .expect('Content-type', /json/)
      .expect(200) // This is the HTTP response
      .then((res) => {
        res.should.have.property('status').equal(200);
        done();
      })
      .catch((err) => done(err));
  });

  it('should get al users', (done) => {
    supertest(app)
      .get('/api/v1/users')
      .set('Authorization', token)
      .expect('Content-type', /json/)
      .expect(200) // This is the HTTP response
      .then((res) => {
        res.should.have.property('status').equal(200);
        done();
      })
      .catch((err) => done(err));
  });

  it('should delete a user by ID', (done) => {
    supertest(app)
      .delete(`/api/v1/user/${id}`)
      .set('Authorization', token)
      .expect('Content-type', /json/)
      .expect(200) // This is the HTTP response
      .then((res) => {
        res.should.have.property('status').equal(200);
        done();
      })
      .catch((err) => done(err));
  });
});
