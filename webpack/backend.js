import webpack from 'webpack';
import fs from 'fs';
import path from 'path';

// workaround to build backend
const nodeModules = {};
fs.readdirSync('node_modules')
  .filter(moduleDirs => ['.bin'].indexOf(moduleDirs) === -1)
  .forEach(module => nodeModules[module] = 'commonjs ' + module);

const cwd = path.join(__dirname, '..');

const sourceDirs = [
  path.join(cwd, 'common'),
  path.join(cwd, 'server'),
];

export default  {
  entry: {
    cli: './server/cli',
  },
  target: 'node',
  externals: nodeModules,
  output: {
    path: cwd,
    filename: '[name].js',
  },
  module: {
    preLoaders: [
      {test: /\.js$/, include: sourceDirs, loader: 'eslint-loader'},
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

