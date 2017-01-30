const mongoose        = require('mongoose');
const Schema          = mongoose.Schema;
const autoInc         = require('mongoose-auto-increment');

// Photo Schema
let PhotoSchema = new Schema({
  photo_name: { type: String, required: [true, 'Photo name required'] },
  userId:    { type: Number, required: [true, 'User ID Required'] },
  photo_id:   { type: Number, default: 1, unique: true },
  photo_url:  { type: String, required: [true, 'Photo URL required'] },
  created_at: {
    type: Date,
    required: [true, 'User created at required'],
    default: Date.now
  }
});

// Exporting the User model
let PhotoModel = mongoose.model('Photo', PhotoSchema);

module.exports = PhotoModel;

autoInc.initialize(mongoose.connection);
PhotoSchema.plugin(autoInc.plugin, { model: 'Photo', field: 'photo_id' } );
