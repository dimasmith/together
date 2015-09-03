/**
 * Application server. Entry point for all app.
 * @type {module.exports}
 */
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var config = require('./config');

app.use(express.static('dist'));

// configure websocket handlers
io.on('connection', function(socket) {
  console.log('connected');
  socket.on('SHOW_PHOTO', function(data) {
    console.log('Switch photo, emit SYNC evet', data);
    socket.broadcast.emit('SYNC', data);
  });
});

console.info('Starting server on', config.host, config.port);
server.listen(config.port, function() {
  console.info('Server started on', config.host, config.port);
});

if (config.development) {
  // Development mode
  // Start webpack dev server as proxy for main server
  var webpack = require('webpack');
  var WebpackDevServer = require('webpack-dev-server');
  var compilerConfiguration = require('./webpack.config');

  var compiler = webpack(compilerConfiguration);
  var devServer = new WebpackDevServer(compiler, {
    contentBase: __dirname + '/dist',
    filename: 'bundle.js',
    inline: true,
    proxy: {
      '*': 'http://' + config.host + ':' + config.port,
    },
  });

  devServer.listen(config.proxyPort, config.host, function() {
    console.info('Dev server started in proxy mode on', config.proxyPort);
  });
}
