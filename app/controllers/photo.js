const express = require('express');
const router  = express.Router();
const Photo   = require('../models/photo.model');
const aws      = require('aws-sdk');
const S3_BUCKET = process.env.S3_BUCKET;

// GET Upload Photo
router.get('/upload', function(req, res, next) {
  res.render('photo/upload');
});

// POST create photo
router.post('/upload', function(req, res, next) {
  let userId = res.locals.user.userId;
  let photoName = req.body.photo_name;
  let photoURL = req.body.photo_url
  Photo.create({photo_name: photoName, userId: userId, photo_url: photoURL }, function(err, photo) {
    if(err) {
      console.log(err);
      throw err;
    } else {
      req.flash('success_msg', 'Image uploaded successfully');
      res.redirect('/');
    }
  });
});


// Ajax to S3 - Ideally need to set uid + user url to make sure no pics get overwritten
router.get('/sign-s3', (req, res) => {
  const s3 = new aws.S3();
  const fileName = req.query['file-name'];
  const fileType = req.query['file-type'];
  const s3Params = {
    Bucket: S3_BUCKET,
    Key: fileName,
    Expires: 60,
    ContentType: fileType,
    ACL: 'public-read'
  };

  s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if(err){
      console.log(err);
      return res.end();
    }
    const returnData = {
      signedRequest: data,
      url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
    };
    res.write(JSON.stringify(returnData));
    res.end();
  });
});

module.exports = router;
