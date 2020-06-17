const webpack = require('webpack')
const merge = require('webpack-merge')
const webpackBase = require('./webpack.base')

Object.keys(webpackBase.entry).forEach(name => {
  // entry 中相对于根地址
  webpackBase.entry[name] = ['./build/dev-client'].concat(webpackBase.entry[name])
})

const webpackConfig = merge(webpackBase, {
  mode: 'development',
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
})

module.exports = webpackConfig
