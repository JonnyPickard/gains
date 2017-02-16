const config = require('../config/test_config.js');
const test = require('tape');
const request = require('supertest');
const app = require('../../app');
const CleanUserDB = require('./helpers/clean_user_db_helper.js');
const CreateUser = require('./helpers/create_user.js');

let user = {
  username: 'test_user',
  email: 'test@test.com',
  password: 'test_password',
  password2: 'test_password'
};

//GET Register
test('Correctly returns the register html page', function (t) {
  request(app)
    .get('/users/register')
    .expect(200)
    .expect('Content-Type', /html/)
    .end(function (err, res) {
      t.error(err, 'No error');
      t.end();
    });
});

// POST Register
test('Correctly post user registration form info', function (t) {
  request(app)
    .post('/users/register')
    .send(user)
    .expect(302)
    .expect('Location', /\//)
    .end(function (err, res) {
      t.error(err, 'No error');
      t.end();
    });

  new CleanUserDB();
});

// POST Logout
test('Correctly post request user logout', function (t) {
  request(app)
    .post('/users/logout')
    .expect(302)
    .expect('Location', /login/)
    .end(function (err, res) {
      t.error(err, 'No error');
      t.end();
    });
});

// Get Login
test('Correctly post user login', function (t) {
  new CreateUser();

  request(app)
    .post('/users/login')
    .send(user)
    .expect(302)
    .expect('Location', /\//)
    .end(function (err, res) {
      t.error(err, 'No error');
      t.end();
    });

  new CleanUserDB();
});

// Get Create User
test('Correctly get users create form', function (t) {
  request(app)
    .get('/users/create')
    .expect(200)
    .expect('Content-Type', /html/)
    .end(function (err, res) {
      t.error(err, 'No error');
      t.end();
    });
});

// GET Account
test('Correctly get users account', function (t) {
  request(app)
    .get('/users/account')
    .expect(200)
    .expect('Content-Type', /html/)
    .end(function (err, res) {
      t.error(err, 'No error');
      t.end();
    });
});

//Get Username + avatarURL as json
test('Correctly get username + avatar as json', function (t) {
  new CreateUser();

  request(app)
    .get('/users/user')
    .query({ userId: 5 })
    .expect(200)
    .expect('Content-Type', /application\/json/)
    .expect({ username: 'test_user',
      avatarURL: '/images/blank-avatar.png' })
    .end(function (err, res) {
      t.error(err, 'No error');
      t.end();
    });

  new CleanUserDB();
});

test.onFinish(() => process.exit(0));
