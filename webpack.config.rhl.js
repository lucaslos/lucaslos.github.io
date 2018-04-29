const path = require('path');
const webpack = require('webpack');
const HappyPack = require('happypack');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

module.exports = {
  mode: 'development',

  entry: [
    path.join(__dirname, 'src/index.js'),
    './style/main.scss',
  ],

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
    publicPath: '/',
    pathinfo: true,
  },

  devtool: 'inline-source-map',

  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'happypack/loader?id=js',
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        loader: 'happypack/loader?id=styles',
        exclude: /node_modules/,
      },
    ],
  },

  plugins: [
    new FriendlyErrorsWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HappyPack({
      id: 'js',
      threads: 4,
      loaders: [
        // 'cache-loader',
        'babel-loader?cacheDirectory',
      ],
    }),
    new HappyPack({
      id: 'styles',
      threads: 4,
      loaders: [
        'cache-loader',
        'style-loader',
        'css-loader?url=false&sourceMap',
        'sass-loader?sourceMap',
        'import-glob',
      ],
    }),
  ],

  resolve: {
    modules: [
      path.join(__dirname, 'src'),
      path.join(__dirname, 'style'),
      'node_modules',
    ],
  },
};
