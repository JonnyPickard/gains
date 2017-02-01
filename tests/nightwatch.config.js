const BINPATH = '../node_modules/nightwatch/bin/';

// we use a nightwatch.conf.js file so we can include comments and helper functions
module.exports = {
  "src_folders": [
    "tests/e2e/user"// Where you are storing your Nightwatch e2e tests
  ],
  "output_folder": "reports", // reports (test outcome) output by nightwatch
  "globals_path": "./tests/config/global.js",

  "selenium": { // downloaded by selenium-download module (see readme)
    "start_process": true, // tells nightwatch to start/stop the selenium process
    "server_path": "../node_modules/nightwatch/bin/selenium.jar",
    "port": 4444, // standard selenium port
    "cli_args": { // chromedriver is downloaded by selenium-download (see readme)
      "webdriver.chrome.driver" : "../node_modules/nightwatch/bin/chromedriver"
    }
  },

  "test_settings": {
    "default": {
      "launch_url": "http://localhost:3333",
      "selenium_port": 4444,
      "selenium_host": "127.0.0.1",
      "silent": true,
      "sync_test_names": true,
      "screenshots": {
        "enabled": false,
        "path": ""
      },
      "desiredCapabilities": { // use Chrome as the default browser for tests
        "browserName": "chrome"
      }
    },
    "chrome": {
      "desiredCapabilities": {
        "browserName": "chrome",
        "javascriptEnabled": true // turn off to test progressive enhancement
      }
    }
  }
}
/**
 * selenium-download does exactly what it's name suggests;
 * downloads (or updates) the version of Selenium (& chromedriver)
 * on your localhost where it will be used by Nightwatch.
 /the following code checks for the existence of `selenium.jar` before trying to run our tests.
 */

require('fs').stat(BINPATH + 'selenium.jar', function (err, stat) { // got it?
  if (err || !stat || stat.size < 1) {
    require('selenium-download').ensure(BINPATH, function(error) {
      if (error) throw new Error(error); // no point continuing so exit!
      console.log('✔ Selenium & Chromedriver downloaded to:', BINPATH);
    });
  }
});
