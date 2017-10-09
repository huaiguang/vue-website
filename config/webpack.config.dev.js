// const path = require('path');
// const webpack = require('webpack');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const htmlHandler = require('./html-handler');
// const forEach = require('lodash/forEach');
// const glob = require('glob');
//
// function getEntriesWithHMR(globPath) {
//   const entries = {}
//   glob.sync(globPath).forEach(entry => {
//     const tmp = entry.split('/').splice(-2)
//     entries[tmp[0]] = ['eventsource-polyfill', entry]
//   })
//   return entries
// }
//
// const ExtractCss = new ExtractTextPlugin({
//   filename: 'css/style.css'
// })
//
// const plugins = [
//   ExtractCss,
//   new webpack.optimize.UglifyJsPlugin({
//     compress: {
//       warnings: false,
//       drop_debugger: true,
//       drop_console: true
//     }
//   })
// ]
//
// module.exports = require('./webpack.config.base')({
//   entry: getEntriesWithHMR('./src/*/main.js'),
//   output: {
//     path: path.resolve(__dirname, '../dist'),
//     publicPath: '/',
//     filename: 'js/[name].bundle.js'
//   },
//   plugins: plugins.concat(
//     htmlHandler({
//       template: path.resolve(__dirname, '../public/index.html'),
//       chunksSortMode: 'dependency',
//       minify: {
//         removeComments: true,
//         collapseWhitespace: true,
//         removeRedundantAttributes: true,
//         useShortDoctype: true,
//         removeEmptyAttributes: true,
//         removeStyleLinkTypeAttributes: true,
//         keepClosingSlash: true,
//         minifyJS: true,
//         minifyCSS: true,
//         minifyURLs: true
//       }
//     })
//   )
// })

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
  // output: {
  //   path: path.resolve(__dirname, '../dist'),
  //   filename: 'static/scripts/[name].[hash:7].js',
  //   chunkFilename: 'static/scripts/[name].[hash:7].js'
  // },
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
