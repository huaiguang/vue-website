const webpack = require('webpack')
const merge = require('webpack-merge')
const webpackBaseConfig = require('./webpack.config.base')
const { getDate } = require('./utils')

const currentDate = getDate()

Object.keys(webpackBaseConfig.entry).forEach(name => {
  // entry 中相对于根地址
  webpackBaseConfig.entry[name] = ['./build/dev-client'].concat(webpackBaseConfig.entry[name])
})

const webpackConfig = merge(webpackBaseConfig, {
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
