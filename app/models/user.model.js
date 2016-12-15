var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// User Schema
var UserSchema = new Schema({
  username: String,
  email: String,
  password: String,
  user_id: Number,
  created_at: {
    type: Date,
    default: Date.now
  }
});

// Exporting the User model
var UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
