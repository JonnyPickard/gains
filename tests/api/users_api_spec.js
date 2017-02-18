const config = require('../config/test_config.js');
const test = require('tape');
const request = require('supertest');
const app = require('../../app');
const cleanUserDB = require('./helpers/clean_user_db_helper.js');
const createUser = require('./helpers/create_user.js');

let user = {
  username: 'test_user',
  email: 'test@test.com',
  password: 'test_password',
  password2: 'test_password'
};

//GET Register
test('Correctly returns the register html page', (t) => {
  request(app)
    .get('/users/register')
    .expect(200)
    .expect('Content-Type', /html/)
    .end((err, res) => {
      t.error(err, 'No error');
      t.end();
    });
});

// POST Register
test('Correctly post user registration form info', (t) => {
  request(app)
    .post('/users/register')
    .send(user)
    .expect(302)
    .expect('Location', /\//)
    .end((err, res) => {
      t.error(err, 'No error');
      t.end();
      cleanUserDB();
    });
});

// POST Logout
test('Correctly post request user logout', (t) => {
  request(app)
    .post('/users/logout')
    .expect(302)
    .expect('Location', /login/)
    .end((err, res) => {
      t.error(err, 'No error');
      t.end();
    });
});

// Get Login
test('Correctly post user login', (t) => {
  createUser();

  request(app)
    .post('/users/login')
    .send(user)
    .expect(302)
    .expect('Location', /\//)
    .end((err, res) => {
      t.error(err, 'No error');
      t.end();
      cleanUserDB();
    });

});

// Get Create User
test('Correctly get users create form', (t) => {
  request(app)
    .get('/users/create')
    .expect(200)
    .expect('Content-Type', /html/)
    .end((err, res) => {
      t.error(err, 'No error');
      t.end();
    });
});

// GET Account
test('Correctly get users account', (t) => {
  request(app)
    .get('/users/account')
    .expect(200)
    .expect('Content-Type', /html/)
    .end((err, res) => {
      t.error(err, 'No error');
      t.end();
    });
});

//Get Username + avatarURL as json
test('Correctly get username + avatar as json', (t) => {
  createUser();

  request(app)
    .get('/users/user')
    .query({ userId: 5 })
    .expect(200)
    .expect('Content-Type', /application\/json/)
    .expect({ username: 'test_user',
      avatarURL: '/images/blank-avatar.png' })
    .end((err, res) => {
      t.error(err, 'No error');
      t.end();
      cleanUserDB();
    });

});

test.onFinish(() => { process.exit(0);});
