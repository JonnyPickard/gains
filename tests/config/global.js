module.exports = {

    error: true,
    /**
     * After all the tests are run, evaluate if there were errors and exit appropriately.
     *
     * If there were failures or errors, exit 1, else exit 0.
     *
     * @param results
     */

    // Can sometimes bug out and exit before tests have been run
    after: function(done) {
      this.error === true ? process.exit(1) : process.exit(0);
    },
    reporter: function(results) {
        if ((typeof(results.failed) === 'undefined' || results.failed === 0) &&
        (typeof(results.error) === 'undefined' || results.error === 0)) {
            this.error = true;
        } else {
            this.erorr = false;
        }
    }
};
