module.exports = function(model, done) {
  model.remove({}, function (err) {
    if (err) done(handleError(err));
  });
  done();
};
