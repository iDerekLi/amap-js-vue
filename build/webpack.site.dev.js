const path = require('path');
const merge = require('webpack-merge');
const config = require('./webpack.base');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackBar = require('webpackbar');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

module.exports = merge(config, {
  entry: {
    docs: './docs/site/main.js',
  },
  devServer: {
    open: true,
    progress: true,
    host: '0.0.0.0',
    stats: 'errors-only',
    disableHostCheck: true,
    historyApiFallback: true,
  },
  output: {
    path: path.join(__dirname, '../docs/dist'),
    publicPath: '/',
    chunkFilename: 'async_[name].js',
  },
  resolve: {
    extensions: ['.vue'],
    alias: {
      vue$: 'vue/dist/vue.js',
    },
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        chunks: {
          chunks: 'all',
          minChunks: 2,
          minSize: 0,
          name: 'chunks',
        },
      },
    },
  },
  plugins: [
    new WebpackBar(),
    new FriendlyErrorsPlugin(),
    new HtmlWebpackPlugin({
      chunks: ['chunks', 'docs'],
      template: path.join(__dirname, '../docs/site/index.html'),
      filename: 'index.html',
    }),
  ],
});
