const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const baseWebpackConfig = require('./webpack.config.base')

Object.keys(baseWebpackConfig.entry).forEach(name => {
  baseWebpackConfig.entry[name] = ['./config/dev-client'].concat(baseWebpackConfig.entry[name])
})

let webpackConfig = merge(baseWebpackConfig, {
  devtool: '#cheap-module-eval-source-map',
  module: {
    rules: [{
        resource: {
          test: /\.css$/
        },
        use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader',
          options: {
            minimize: false,
            sourceMap: false
          }
        }]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new FriendlyErrorsPlugin()
  ]
})

module.exports = webpackConfig
