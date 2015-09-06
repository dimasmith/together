/**
 * Default application runner
 * @type {module.exports}
 */
var defaultConfig = require('./config');
var startApplication = require('./app');

startApplication(defaultConfig);
