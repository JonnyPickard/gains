var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var bcrypt   = require('bcrypt');
var autoInc  = require('mongoose-auto-increment');

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

// Bcrypt to hash passwords
UserSchema.methods.hashPassword = function(passwordRaw) {
  return bcrypt.hashSync(passwordRaw, bcrypt.genSaltSync(10));
};

UserSchema.methods.comparePasswords = function(passwordRaw, passwordHash) {
  return bcrypt.compareSync(passwordRaw, passwordHash);
};

// Exporting the User model
var UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;

autoInc.initialize(mongoose.connection);
UserSchema.plugin(autoInc.plugin, { model: 'User', feild: 'user_id' } );
