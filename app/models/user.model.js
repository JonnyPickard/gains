const mongoose        = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema          = mongoose.Schema;
const bcrypt          = require('bcryptjs');
const autoInc         = require('mongoose-auto-increment');

mongoose.Promise = global.Promise;

// User Schema
var UserSchema = new Schema({
  local: {
    userId:     { type: Number, default: 1 },
    username:   { type: String },
    email:      { type: String},
    password:   { type: String },
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

  validPassword: function(password) {
    return bcrypt.compare(password, this.local.password);
  },

  getUserByUsername: function(username, callback) {
    let query = {username: username};
    UserModel.findOne(query, callback);
  },

  getUserById: function(id, callback){
    UserModel.findById(id, callback);
  }
};


// Exporting the User model
var UserModel = mongoose.model('User', UserSchema);

// Auto increment the userId feild
autoInc.initialize(mongoose.connection);
UserSchema.plugin(autoInc.plugin, { model: 'User', field: 'local.userId' } );

module.exports = UserModel;
