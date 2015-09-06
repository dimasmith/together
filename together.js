#!/usr/bin/env node
/**
 * CLI runner for together system
 */
var parseArgs = require('minimist');
var _ = require('lodash');

var args = parseArgs(process.argv.slice(2));

var port = args.port || process.env.SERVER_PORT || 8000;
var photosDir = args.photos || process.env.PHOTOS;

if (!photosDir) {
  console.error('Please specify directory with photos by either --photos=<dir> or PHOTOS env variable');
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
