const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = (env, argv) => {
  const base = path.resolve(__dirname, argv.script);
  const entry = path.join(base, 'src/index.ts');
  const outputPath = path.join(base, 'assets/js');
  const tsconfigPath = path.join(base, 'tsconfig.json');

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
