Gains
=====

[![Build Status](https://travis-ci.org/JonnyPickard/gains.svg?branch=master)](https://travis-ci.org/JonnyPickard/gains)

http://gains-app.herokuapp.com


About
-----

This is an Instagram clone for gym goers built with NodeJS, ExpresssJS and Mongodb. Tested with Mocha, Chai and ZombieJS.

Feature Checklist
--------------

- <s>User login / registration / authentication</s>
- <s>Upload photos</s>
- <s>View all user photos stream page</s>
- <s>Oauth login with facebook</s>
- <s>Oauth login with google</s>
- User homepage for RUD existing photos
- Endorse a photo
- Comment on a photo
- Endorse a comment
- Comment on a comment
- Upload / stream videos
- Responsive UI / front end magic

Installation Instructions
-------------------------

*Click on the links to download.*

- The app requires [Mongodb](https://www.mongodb.com/download-center?jmp=nav#community) and [Nodejs](https://nodejs.org/en/download/).
- Feature tests require [Selenium Webdriver](https://www.npmjs.com/package/webdriver-manager).

In a new terminal window boot up mongodb by running ``$ mongod``

1. Clone this repo.
2. ``$ cd gains`` into directory.
3. ``$ npm install`` to install dependencies.
4. ``$ npm start`` to boot up a server and view on http://localhost:3000
5. Unit tests
  - ``$ npm run unit`` to run unit tests.
6. Feature tests
  - ``$ webdriver-manager start`` in a separate window to boot up Selenium Webdriver.
  - ``$ npm run e2e`` to run feature tests.
