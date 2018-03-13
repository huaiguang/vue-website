const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const htmlHandler = require('./html-handler');
const merge = require('webpack-merge')
const forEach = require('lodash/forEach');
const glob = require('glob');

function getEntriesWithHMR(globPath) {
  const entries = {}
  glob.sync(globPath).forEach(entry => {
    const tmp = entry.split('/').splice(-2)
    entries[tmp[0]] = ['eventsource-polyfill', entry]
  })
  return entries
}

const ExtractCss = new ExtractTextPlugin({
  filename: 'css/[name].css'
})

const plugins = [
  ExtractCss,
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
      drop_debugger: true,
      drop_console: true
    }
  })
]

// module.exports = require('./webpack.config.base')({
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

const webpackBase = require('./webpack.config.base');

module.exports = merge(webpackBase, {
  plugins: plugins.concat(
    htmlHandler({
      template: path.resolve(__dirname, '../public/index.html'),
      chunksSortMode: 'dependency',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    })
  )
})
