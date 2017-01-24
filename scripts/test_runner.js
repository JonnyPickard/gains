#!/usr/bin/env node
let path            = require("path");
let error           = "Please specify unit or feature spec using u or f\n"
let arg             = process.argv[2];
let exec            = require('child_process').exec;
let unitTestPath    = "./node_modules/mocha/bin/mocha --recursive --colors ./tests/unit";
let featureTestPath = "./node_modules/mocha/bin/mocha --recursive --colors ./tests/e2e";

if (arg === "u") {
  exec("node " + unitTestPath, function (error, stdout, stderr) {
    console.log('stdout: ' + stdout);
    console.log('error: '  + error);
    console.log('stderr: ' + stderr);
  });
} else if (arg === "f") {
  exec("node " + featureTestPath, function (error, stdout, stderr) {
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    console.log('error: '  + error);
  });
} else {
  console.error(error);
}
