/**
 * Development server proxy
 * @type {module.exports}
 */
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var compilerConfiguration = require('./webpack/frontend.dev');

function start(config) {
  if (config.development) {
    // Development mode
    // Start webpack dev server as proxy for main server
    var compiler = webpack(compilerConfiguration);
    var devServer = new WebpackDevServer(compiler, {
      contentBase: __dirname + '/dist',
      filename: 'bundle.js',
      inline: true,
      hot: true,
      proxy: {
        '*': 'http://' + config.host + ':' + config.port,
      },
    });

    devServer.listen(config.proxyPort, config.host, function() {
      console.info('Dev server started in proxy mode on', config.proxyPort);
    });
  }

}

module.exports = start;
