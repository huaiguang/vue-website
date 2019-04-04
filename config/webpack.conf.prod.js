const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const merge = require('webpack-merge')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const htmlHandler = require('./html-handler');
const webpackBaseConfig = require('./webpack.conf.base');

const ExtractCss = new MiniCssExtractPlugin({
  filename: 'css/[name].css',
  chunkFilename: 'css/common.css'
})

const plugins = [
  ExtractCss
]

module.exports = merge(webpackBaseConfig, {
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
  ),
  optimization: {
    runtimeChunk: {
      name: 'manifest'
    },
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'common',
          test: /\.css$/,
          chunks: 'initial',
          enforce: true
        },
        common: {
          name: "common",
          chunks: "initial",
          minSize: 1,
          priority: 0,
          minChunks: 1
        },
        // 首先: 打包node_modules中的文件
        vendor: {
          name: "vendor",
          test: /node_modules/,
          chunks: "initial",
          priority: 10,
          minChunks: 1,
        }
      }
    }
  }
})
