import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';

import config from './../config.js';
import baseConfiguration from './frontend.js';

var devConfiguration = Object.assign({},
  baseConfiguration,
  {
    debug: true,
    devtool: 'eval',
  }
);

devConfiguration.module.loaders.push(
  {test: /\.(gif|png|jpe?g|svg)$/, loader: 'url?name=[path][name].[ext]?[hash]'}
);

export default devConfiguration;
