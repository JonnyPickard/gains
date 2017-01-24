#!/usr/bin/env node
const path            = require("path");
const err             = "Please specify unit or feature spec using u or f\n"
const arg             = process.argv[2];
const exec            = require('child_process').exec;
const unitTestPath    = "./node_modules/mocha/bin/mocha --recursive --colors ./tests/unit";
const featureTestPath = "./node_modules/mocha/bin/mocha --recursive --colors ./tests/e2e";
const logOutput       = require("./helpers/logConsoleOutput");

// Run specified tests
if (arg === "u") {
  exec("node " + unitTestPath, function (error, stdout, stderr) {
    logOutput(stdout, error, stderr)
  });
} else if (arg === "f") {
  exec("node " + featureTestPath, function (error, stdout, stderr) {
    logOutput(stdout, error, stderr)
  });
} else {
  console.error(err);
}
