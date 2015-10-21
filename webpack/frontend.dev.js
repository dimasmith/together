import webpack from 'webpack';

import config from './../config.js';
import baseConfiguration from './frontend.js';

const devConfiguration = Object.assign({},
  baseConfiguration,
  {
    debug: true,
    devtool: 'eval',
  }
);

devConfiguration.plugins.push(
  new webpack.DefinePlugin({
    WEBSOCKET_ADDRESS: `"http://${config.host}:${config.port}"`,
  })
);

devConfiguration.module.loaders.push(
  {test: /\.(gif|png|jpe?g|svg)$/, loader: 'url?name=[path][name].[ext]?[hash]'}
);

export default devConfiguration;
