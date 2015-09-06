#!/usr/bin/env node
/**
 * CLI runner for together system
 */
var program = require('commander');
var _ = require('lodash');

program
  .version('0.1.0')
  .description('Starts server and show photos from specified dir')
  .arguments('<photos-dir>')
  .option('-p --port [port]', 'Server port', 8000)
  .option('-w --cwd <dir>', 'Application working directory', __dirname);

program.parse(process.argv);

if (program.cwd !== process.cwd) {
  process.chdir(program.cwd);
}

var port = program.port || process.env.SERVER_PORT || 8000;
var photosDir = program.args[0] || process.env.PHOTOS;

if (!photosDir) {
  console.error('Please provide photos directory');
  program.outputHelp();
  process.exit(1);
}

var config = _.extend({}, require('./config'));
config.development = false;
config.port = port;
config.photosDir = photosDir;
config.previewLoader.type = 'filesystem';
config.previewLoader.config.photosDir = photosDir;

var startApp = require('./app');
startApp(config);
