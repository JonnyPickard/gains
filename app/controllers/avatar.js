const express = require('express');
const router  = express.Router();
const User   = require('../models/user.model');
const AWS      = require('aws-sdk');

const S3_BUCKET = process.env.S3_BUCKET;

// POST create avatar
router.post('/upload', function(req, res, next) {
  let userId = res.locals.user.userId;
  console.log(req.body);
  let avatarURL = req.body.avatar_url;

  User.findOne({'userId': userId}, function(err, user) {
    if(err) { throw(err); }
    if(!user) {
      req.flash('error_msg', 'No user found');
      res.redirect('/users/account');
    } else {
      user.avatarURL = avatarURL;
      user.save(function(err) {
        if(err) { throw err; }
        res.redirect('/users/account');
      });
    }
  });
});


// Ajax to S3 - Ideally need to set uid + user url
router.get('/sign-s3', (req, res) => {
  const userId = res.locals.user.userId;
  const s3 = new AWS.S3();
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
