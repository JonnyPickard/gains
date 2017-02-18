module.exports = function(model, done) {
  model.remove({}, (err) => {
    if (err) { done(handleError(err)); }
  });
  done();
};
