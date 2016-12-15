exports.config = {
  specs: ['*.js'],
  capabilities: {
      browserName: 'chrome'
  },
  seleniumAddress: 'http://localhost:4444/wd/hub',
  framework: 'mocha',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 100000,
    isVerbose: true
  },
  onPrepare: function() {
    browser.ignoreSynchronization = true;
  }
};
