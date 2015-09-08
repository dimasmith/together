import webpack from 'webpack';
import fs from 'fs';
import config from './config.js';

// workaround to build backend
var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

const sourceDirs = [
  __dirname + '/common',
  __dirname + '/server',
];

export default  {
  entry: {
    cli: './server/cli',
  },
  target: 'node',
  externals: nodeModules,
  output: {
    path: __dirname,
    filename: '[name].js',
  },
  module: {
    preLoaders: [
      {test: /\.js$/, include: sourceDirs, loader: 'jscs-loader'},
    ],
    loaders: [
      {test: /\.json$/, loader: 'json-loader'},
      {test: /\.js$/, include: sourceDirs, loader: 'babel-loader?optional=runtime'},
    ],
  },
  plugins: [
    new webpack.BannerPlugin('#!/usr/bin/env node', {raw: true}),
  ],
};

