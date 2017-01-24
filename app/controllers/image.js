const express = require('express');
const router  = express.Router();
const Photo   = require('../models/photo.model');

//Get profile page
router.get('/upload', function(req, res, next) {
  res.render('image/upload');
});

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
