module.exports = {
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
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
