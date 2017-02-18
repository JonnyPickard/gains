const mongoose        = require('mongoose');
mongoose.Promise      = require('bluebird');
const Schema          = mongoose.Schema;
const bcrypt          = require('bcryptjs');
const autoIncrement   = require('mongoose-auto-increment');

// User Schema
const UserSchema = new Schema({
  userId:     { default: 0 },
  avatarURL:  { type: String, default: '/images/blank-avatar.png' },
  local: {
    username:   { type: String },
    email:      { type: String},
    password:   { type: String }
  },
  created_at: {
    type: Date,
    required: [true, 'User created at required'],
    default: Date.now
  },
  facebook: {
    id: String,
    token: String,
    email: String,
    name: String
  },
  google: {
    id: String,
    token: String,
    email: String,
    name: String
  }
});

// Bcrypt to hash passwords
UserSchema.methods = {

  hashPassword: function(passwordRaw) {
    return bcrypt.hashSync(passwordRaw, bcrypt.genSaltSync(10));
  },

  validPassword: function(password, passwordHash, callback) {
    bcrypt.compare(password, passwordHash, callback);
  },

  getUserById: function(id, callback) {
    UserModel.findById(id, callback);
  },

  getUserByUserId: function(userId, callback) {
    UserModel.findOne(userId, callback);
  }
};

// Auto increment the userId field
autoIncrement.initialize(mongoose.connection);
UserSchema.plugin(autoIncrement.plugin, { model: 'User', field: 'userId' } );

// Exporting the User model
const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
