const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = (env, argv) => {
  let base;
  let entry;
  let outputPath;
  let tsconfigPath;

  if (argv.script === 'editor') {
    base = path.resolve(__dirname, 'editor');
  } else if (argv.script === 'game') {
    base = path.resolve(__dirname, 'game');
  }
  entry = path.join(base, 'src/index.ts');
  outputPath = path.join(base, 'dist');
  tsconfigPath = path.join(base, 'tsconfig.json');

  const config = {
    entry,
    output: {
      path: outputPath,
      filename: 'main.js',
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          loader: 'ts-loader',
          exclude: '/node_modules/',
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.js'],
      plugins: [],
    },
  };

  if (argv.script === 'editor') {
    config.resolve.plugins.push(new TsconfigPathsPlugin({ configFile: tsconfigPath }));
  }

  return config;
};
