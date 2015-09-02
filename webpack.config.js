module.exports = {
  context: __dirname + '/client',
  entry: './app',
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js',
  },
  devtool: 'eval',
  module: {
    loaders: [
      { test: /\.jade$/, loader: 'jade-loader'},
      { test: /\.js$/, exclude: '/node_modules/', loader: 'babel-loader'},
    ],
  },
};
