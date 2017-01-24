const mongoose        = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema          = mongoose.Schema;
const bcrypt          = require('bcrypt');
const autoInc         = require('mongoose-auto-increment');

// User Schema
var UserSchema = new Schema({
  username:   { type: String, required: [true, 'Username required'], unique: true },
  email:      { type: String, required: [true, 'User email address required'], unique: true },
  password:   { type: String, required: [true, 'User password required'] },
  user_id:    { type: Number, default: 1 },
  created_at: {
    type: Date,
    required: [true, 'User created at required'],
    default: Date.now
  }
});

// Bcrypt to hash passwords
UserSchema.methods = {

  hashPassword: function(passwordRaw) {
    return bcrypt.hashSync(passwordRaw, bcrypt.genSaltSync(10));
  },

  comparePasswords: function(passwordRaw, passwordHash, callback) {
    bcrypt.compare(passwordRaw, passwordHash, function(err, isMatch){
      if(err) throw err;
      callback(null, isMatch);
    });
  },

  getUserByUsername: function(username, callback) {
    let query = {username: username};
    UserModel.findOne(query, callback);
  },

  getUserById: function(id, callback){
    UserModel.findById(id, callback);
  }
};

UserSchema.pre('save', function(next) {
    var user = this;

    // Only hash the password if it is new
    if (!user.isModified('password')) {
      return next()
    } else {
      user.password = this.hashPassword(user.password);
      next();
    }
});

// Exporting the User model
var UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;

// Auto increment the user_id feild
autoInc.initialize(mongoose.connection);
UserSchema.plugin(autoInc.plugin, { model: 'User', field: 'user_id' } );
UserSchema.plugin(uniqueValidator);
