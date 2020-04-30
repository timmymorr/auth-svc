const should = require('should');
const User = require('../../routes/V1/models/users');


describe('userModelTests', () => {
  const testUser = {};
  const props = ['firstName', 'lastName', 'email', 'password'];

  before(() => {
    testUser.firstName = 'timmy';
    testUser.lastName = 'morrissey';
    testUser.email = 'timmymorr@gmail.com';
    testUser.password = 'password';
  });

  it('should validate a user with a username and password', (done) => {
    const m = new User(testUser);
    m.validate((err) => {
      should.not.exist(err);
      should(m.email).equal(testUser.email);
      should(m.password).equal(testUser.password);
      done();
    });
  });

  it('should not validate a user with no firstName, lastname, email and password', (done) => {
    const m = new User({});
    m.validate((err) => {
      should.exist(err);
      should(err.errors).have.property('firstName');
      should(err.errors).have.property('lastName');
      should(err.errors).have.property('email');
      should(err.errors).have.property('password');
      done();
    });
  });

  props.forEach((prop) => {
    it(`should not validate a user with no ${prop}`, (done) => {
      delete testUser[prop];
      const m = new User(testUser);
      m.validate((err) => {
        should.exist(err);
        should(err.errors).have.property('firstName');
        done();
      });
    });
  });
});
