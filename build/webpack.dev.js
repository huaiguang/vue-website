const webpack = require('webpack')
const merge = require('webpack-merge')
const webpackBase = require('./webpack.base')
const { getDate } = require('./utils')

const currentDate = getDate()

Object.keys(webpackBase.entry).forEach(name => {
  // entry 中相对于根地址
  webpackBase.entry[name] = ['./build/dev-client'].concat(webpackBase.entry[name])
})

const webpackConfig = merge(webpackBase, {
  mode: 'development',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env'),
      BuildDate: JSON.stringify(currentDate)
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  devtool: '#cheap-module-eval-source-map'
})

module.exports = webpackConfig
