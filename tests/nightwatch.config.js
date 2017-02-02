const BINPATH = '../node_modules/nightwatch/bin/';

module.exports = {
  "src_folders": [
    "tests/e2e/user"
  ],
  "output_folder": "reports",
  "globals_path": "./tests/config/global.js",

  "test_settings": {
    "default": {
      "launch_url": "http://localhost:3333",
      "selenium_port": 4444,
      "selenium_host": "localhost",
      "silent": true,
      "sync_test_names": true,
      "firefox_profile": false,
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
