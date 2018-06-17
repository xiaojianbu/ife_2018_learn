const webpack = require('webpack')
const merge = require('webpack-merge')
const path = require('path')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, '../dist'),
    compress: true,
    port: 8000,
    hot: true
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  mode: 'development'
})
