#!/usr/bin/env node
const path            = require("path");
const err             = "You can specify unit or feature tests by using u or f\n"
const arg             = process.argv[2];
const exec            = require('child_process').exec;
const unitTestPath    = "./node_modules/mocha/bin/mocha --recursive --colors ./tests/unit";
const featureTestPath = "./node_modules/.bin/nightwatch --config ./tests/nightwatch.config.js";
const logOutput       = require("./helpers/logConsoleOutput");

// Run specified tests
if (arg === "u") {
  exec("node " + unitTestPath, function (error, stdout, stderr) {
    logOutput(stdout, error, stderr)
  });
} else if (arg === "f") {
  exec(featureTestPath, function (error, stdout, stderr) {
    logOutput(stdout, error, stderr)
  });
} else {
  console.error(err);
  exec("node " + unitTestPath, function (error, stdout, stderr) {
    logOutput(stdout, error, stderr)
    if(stderr) {
      console.log(stderr);
    }
    exec("node " + featureTestPath, function (error, stdout, stderr) {
      logOutput(stdout, error, stderr)
    });
  });
}
