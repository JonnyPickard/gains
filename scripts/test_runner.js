#!/usr/bin/env node
const path            = require("path");
const error           = "Please specify unit or feature spec using u or f\n"
const arg             = process.argv[2];
const exec            = require('child_process').exec;
const unitTestPath    = "./node_modules/mocha/bin/mocha --recursive --colors ./tests/unit";
const featureTestPath = "./node_modules/mocha/bin/mocha --recursive --colors ./tests/e2e";

if (arg === "u") {
  exec("node " + unitTestPath, function (error, stdout, stderr) {
    logOutput(stdout, error, stderr)
  });
} else if (arg === "f") {
  exec("node " + featureTestPath, function (error, stdout, stderr) {
    logOutput(stdout, error, stderr)
  });
} else {
  console.error(error);
}

function logOutput(stdout, error, stderr) {
  console.log('stdout: ' + stdout,
              'error: '  + error,
              'stderr: ' + stderr);
};
