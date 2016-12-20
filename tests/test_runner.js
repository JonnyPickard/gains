#!/usr/bin/env node
let path = require("path");
function error() { return console.log("Please specify unit or feature spec using u or f\n") };

if (process.argv.length < 3) {
  error();
}

var arg  = process.argv[2];
var exec = require('child_process').exec

if (arg === "u") {
  exec("node ./node_modules/mocha/bin/mocha --recursive --colors ./tests/unit", function (error, stdout, stderr) {
    console.log('stdout: ' + stdout);
    if (error !== null) {
      console.log('error: ' + error);
      console.log('stderr: ' + stderr);
    }
  });
} else if (arg === "f") {
  console.log(__dirname);
  exec('node ./node_modules/mocha/bin/mocha --recursive --colors ./tests/e2e', function (error, stdout, stderr) {
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    console.log('error: ' + error);
  });
} else {
  error();
}
