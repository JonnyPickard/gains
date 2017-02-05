module.exports = {
  'src_folders': [
    'tests/e2e/features/user/user_edit_profile_information.js'
  ],
  'output_folder': 'reports',
  'globals_path': './tests/e2e/config/global.js',

  'test_settings': {
    'default': {
      'output': true,
      'launch_url': 'http://localhost:3333',
      'selenium_port': 4444,
      'selenium_host': 'localhost',
      'silent': true,
      'sync_test_names': true,
      'firefox_profile': false,
      'screenshots': {
        'enabled': false,
        'path': ''
      },
      'desiredCapabilities': { // use Chrome as the default browser for tests
        'browserName': 'chrome'
      }
    },
    'chrome': {
      'desiredCapabilities': {
        'browserName': 'chrome',
        'javascriptEnabled': true // turn off to test progressive enhancement
      }
    }
  }
};
