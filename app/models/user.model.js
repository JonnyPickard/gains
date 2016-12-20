var mongoose        = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema          = mongoose.Schema;
var bcrypt          = require('bcrypt');
var autoInc         = require('mongoose-auto-increment');

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
UserSchema.methods.hashPassword = function(passwordRaw) {
  return bcrypt.hashSync(passwordRaw, bcrypt.genSaltSync(10));
};

UserSchema.methods.comparePasswords = function(passwordRaw, passwordHash) {
  return bcrypt.compareSync(passwordRaw, passwordHash);
};

UserSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) {
      return next()
    } else {
      user.password = UserSchema.methods.hashPassword(user.password);
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
