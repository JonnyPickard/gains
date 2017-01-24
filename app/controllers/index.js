const express = require('express');
const router  = express.Router();
const Photo   = require('../models/photo.model');

//GET Index Page
router.get('/', function(req, res, next) {
  Photo.find({}, {}, { sort: { 'created_at' : -1 } }, function(err, photos) {
    res.render('index', { photos: photos });
  });
});

module.exports = router;
