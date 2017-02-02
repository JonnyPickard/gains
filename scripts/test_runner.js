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
  exec("node " + featureTestPath, function (error, stdout, stderr) {
    logOutput(stdout, error, stderr)
    // exec("curl -s -L http://localhost:4444/selenium-server/driver?cmd=shutDownSeleniumServer > /dev/null 2>&1");
  });
} else {
  exec("node " + unitTestPath, function (error, stdout, stderr) {
    logOutput(stdout, error, stderr)

    exec("node " + featureTestPath, function (error, stdout, stderr) {
      logOutput(stdout, error, stderr)
      // exec("curl -s -L http://localhost:4444/selenium-server/driver?cmd=shutDownSeleniumServer > /dev/null 2>&1");
    });
  });
}
