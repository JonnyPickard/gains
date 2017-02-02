const mongoose        = require('mongoose');
mongoose.Promise      = require('bluebird');
const Schema          = mongoose.Schema;
const autoInc         = require('mongoose-auto-increment');

// Photo Schema
let PhotoSchema = new Schema({
  photo_name: { type: String, required: [true, 'Photo name required'] },
  userId:     { type: Number, required: [true, 'User ID Required'] },
  photoId:    { type: Number, default: 0, unique: true },
  photo_url:  { type: String, required: [true, 'Photo URL required'] },
  created_at: {
    type: Date,
    required: [true, 'User created at required'],
    default: Date.now
  }
});

// Auto increment the photoId field
autoInc.initialize(mongoose.connection);
PhotoSchema.plugin(autoInc.plugin, { model: 'Photo', field: 'photoId' } );

// Exporting the User model
let PhotoModel = mongoose.model('Photo', PhotoSchema);

module.exports = PhotoModel;
