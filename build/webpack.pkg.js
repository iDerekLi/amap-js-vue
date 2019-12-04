const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const config = require('./webpack.base');
const pkg = require('../package');

const banner = `
amap-js-vue v${pkg.version}

Copyright (c) 2019-present Derek Li
Released under the MIT License - https://choosealicense.com/licenses/mit/

https://github.com/iDerekLi/amap-js-vue
`;

const isMinify = process.argv.indexOf('-p') !== -1;

module.exports = merge(config, {
  mode: 'production',
  entry: {
    'amap-js-vue': './es/index.js',
  },
  output: {
    path: path.join(__dirname, '../lib'),
    library: 'AMapJsVue',
    libraryTarget: 'umd',
    filename: isMinify ? '[name].min.js' : '[name].js',
    umdNamedDefine: true,
    // https://github.com/webpack/webpack/issues/6522
    globalObject: "typeof self !== 'undefined' ? self : this",
  },
  externals: {
    vue: {
      root: 'Vue',
      commonjs: 'vue',
      commonjs2: 'vue',
      amd: 'vue',
    },
  },
  performance: false,
  optimization: {
    minimize: isMinify,
  },
  plugins: [new webpack.BannerPlugin(banner.trim())],
});
