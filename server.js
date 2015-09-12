/**
 * Default application runner
 * @type {module.exports}
 */
var defaultConfig = require('./config');
var startApplication = require('./server/app');
var startDevProxy = require('./devProxy');

startApplication(defaultConfig);
startDevProxy(defaultConfig);
