const express = require('express');
const router  = express.Router();
const Photo   = require('../models/photo.model');

// GET Upload Photo
router.get('/upload', function(req, res, next) {
  res.render('photo/upload');
});

// POST crete photo
router.post('/upload', function(req, res, next) {
  let userId = res.locals.user.user_id;
  let photoName = req.body.photo_name;
  Photo.create({photo_name: photoName, user_id: userId }, function(err, photo) {
    if(err) {
      throw err;
    } else {
      req.flash('success_msg', 'Image uploaded successfully');
      res.redirect('/');
    }
  });
});

module.exports = router;
