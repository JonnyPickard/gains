// Form validation on request body
module.exports = (request) => {
  let req = request;
  let username = req.body.username;
  let email = req.body.email;
  let password = req.body.password;
  let password2 = req.body.password2;

  req.checkBody('username', 'Username is required').notEmpty();
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('email', 'Email is not valid').isEmail();
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('password2', 'Passwords do not match')
    .equals(req.body.password);

  let errors = req.validationErrors();
  if(errors) { return errors; } else { return false; }
};
