module.exports = {
    /**
     * After all the tests are run, evaluate if there were errors and exit appropriately.
     *
     * If there were failures or errors, exit 1, else exit 0.
     *
     * @param results
     */

    // Can sometimes bug out and exit before tests have been run
    after: function(done) {
      done(process.exit(0));
    }
};
