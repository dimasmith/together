import webpack from 'webpack';

import baseConfiguration from './frontend.js';

const prodConfiguration = Object.assign({}, baseConfiguration);
prodConfiguration.devtool = 'source-map';
prodConfiguration.plugins.push(
  new webpack.optimize.UglifyJsPlugin()
);
prodConfiguration.plugins.push(
  new webpack.DefinePlugin({
    WEBSOCKET_ADDRESS: 'window.location.href',
  })
);

prodConfiguration.module.loaders.push(
  {
    test: /\.(gif|png|jpe?g|svg)$/,
    loaders: [
      'url?limit=10240&name=[path][name].[ext]?[hash]',
      'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false',
    ],
  }
);

export default prodConfiguration;
