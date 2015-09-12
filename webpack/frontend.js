/**
 * Base frontend webpack configuration file.
 * It should be extended with profile-specific configurations.
 * Not directly usable.
 */
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';

import config from './../config.js';

export const cwd = path.join(__dirname, '..');

export const sourceDirs = [
  path.join(cwd, 'client'),
  path.join(cwd, 'common'),
];

export default {
  entry: {
    client: './client/app',
  },
  output: {
    path: path.join(cwd, 'dist'),
    filename: '[name].bundle.js',
  },
  module: {
    preLoaders: [
      {test: /\.js$/, include: sourceDirs, loader: 'jscs-loader'},
    ],
    loaders: [
      {test: /\.jade$/, loader: 'jade-loader'},
      {test: /\.scss$/, loader: 'style!css!sass'},
      {test: /\.js$/, include: sourceDirs, loader: 'babel-loader?optional=runtime'},
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Together',
      template: 'client/index.html',
      inject: 'body',
    }),
  ],
};
