module.exports = function logOutput(stdout, error, stderr) {
  console.log('stdout: ' + stdout,
              'error: '  + error,
              'stderr: ' + stderr);
};
