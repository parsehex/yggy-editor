const path = require('path');

module.exports = {
  entry: './editor/src/index.ts',
  // entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'editor/js'),
    // path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
  },
  module: {
    rules: [
      // { test: /\.ts$/, loader: 'awesome-typescript-loader', exclude: '/node_modules/' },
      { test: /\.ts$/, loader: 'ts-loader', exclude: '/node_modules/' },
    ]
  },
  resolve: {
    extensions: ['.ts', '.js'],
  }
};
