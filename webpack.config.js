const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = (env, { script, mode }) => {
  const base = path.resolve(__dirname, script);
  const entry = path.join(base, 'src/index.ts');
  let outputPath = path.join(base, 'assets/js');
  const tsconfigPath = path.join(base, 'tsconfig.json');

  if (script === 'editor-server') outputPath = base;

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
    devtool: mode === 'production' ? 'source-map' : 'cheap-source-map',
  };

  if (script !== 'game') {
    config.resolve.plugins.push(new TsconfigPathsPlugin({ configFile: tsconfigPath }));
  }

  if (script) {
    config.target = 'node';
    config.node = {
      __dirname: false,
    };
  }

  return config;
};
