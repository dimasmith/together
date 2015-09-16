/**
 * Development server proxy
 * @type {module.exports}
 */
import webpack from 'webpack';
import WebpackDevServer from  'webpack-dev-server';

import webpackConfig from './webpack/frontend.dev';
import path from 'path';
import {createLogger} from './server/util/logger.js';

const logger = createLogger('webpack-devserver');
const publicPath = '/';
const contentBase = path.join(__dirname, 'dist');

function start(config) {
  if (config.development) {
    // Development mode
    // Start webpack dev server as proxy for main server
    const compiler = webpack(webpackConfig);
    const serverUrl = `http://${config.host}:${config.port}`;

    const devServer = new WebpackDevServer(compiler, {
      contentBase,
      publicPath,
      filename: 'client.bundle.js',
      inline: true,
      quiet: false,
      noInfo: true,
      stats: {colors: true},
      proxy: {
        '/photos/*': serverUrl,
      },
    });

    devServer.listen(config.proxyPort, config.host, () => logger.info('Dev server started in proxy mode on', config.proxyPort));
  }
}

module.exports = start;
