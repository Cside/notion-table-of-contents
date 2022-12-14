const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const TerserPlugin = require('terser-webpack-plugin');

/** @type import('webpack').Configuration */
module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new TerserPlugin({
      terserOptions: {
        compress: {
          pure_funcs: ['console.log', 'console.info'],
        },
      },
    }),
  ],
});
