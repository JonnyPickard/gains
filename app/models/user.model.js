var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// User Schema
var UserSchema = new Schema({
  username:   { type: String, required: [true, 'Username required'] },
  email:      { type: String, required: [true, 'User email address required'] },
  password:   { type: String, required: [true, 'User password required'] },
  user_id:    { type: Number, required: [true, 'User id required'] },
  created_at: {
    type: Date,
    required: [true, 'User created at required'],
    default: Date.now
  }
});

// Exporting the User model
var UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
