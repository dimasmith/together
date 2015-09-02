/**
 * Application server. Entry point for all app.
 * @type {module.exports}
 */
var express = require('express');
var app = express();

var config = {
  host: process.env.SERVER_HOST || 'localhost',
  port: process.env.SERVER_PORT || 8000,
};

app.use(express.static('dist'));

console.info('Starting server on', config.host, config.port);
app.listen(config.port, function() {
  console.info('Server started on', config.host, config.port);
});
