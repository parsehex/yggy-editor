const path = require('path');

module.exports = (env, argv) => {
  let entry;
  let outputPath;

  if (argv.script === 'editor') {
    entry = './editor/src/index.ts';
    outputPath = path.resolve(__dirname, 'editor/js');
  } else if (argv.script === 'game') {
    entry = './src/index.ts';
    outputPath = path.resolve(__dirname, 'dist');
  }

  return {
    entry,
    output: {
      path: outputPath,
      filename: 'main.js',
    },
    module: {
      rules: [
        { test: /\.ts$/, loader: 'ts-loader', exclude: '/node_modules/' },
      ]
    },
    resolve: {
      extensions: ['.ts', '.js'],
    },
  };
};
