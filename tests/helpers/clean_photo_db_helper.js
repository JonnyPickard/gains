const Photo = require('../../app/models/photo.model.js');

module.exports = () => {
  Photo.remove({}, () => {});
};
