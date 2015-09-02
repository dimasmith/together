module.exports = {
  context: __dirname + '/client',
  entry: './app',
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      { test: /\.jade$/, loader: 'jade-loader'},
    ],
  },
};
