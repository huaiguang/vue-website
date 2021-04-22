const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const htmlHandler = require('./html-handler')
const webpackBaseConfig = require('./webpack.config.base')
const { getDate } = require('./utils')

const currentDate = getDate()

module.exports = merge(webpackBaseConfig, {
  mode: 'production',
  devtool: '#cheap-module-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/prod.env'),
      BuildDate: JSON.stringify(currentDate)
    })
  ].concat(
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
      name: 'runtime'
    },
    minimize: true,
    minimizer: [
      new OptimizeCssAssetsPlugin({
        // assetNameRegExp: /\.css(\?.*)?$/g,
        cssProcessor: require('cssnano'),
        cssProcessorOptions: {
          // 导出sourcemap
          // inline true 会内联sourcemap
          // inline false，annotation add external sourcemap
          map: {
            inline: false,
            annotation: true
          }
        },
        cssProcessorPluginOptions: {
          preset: [
            'default',
            {
              normalizeUnicode: false
            }
          ]
        },
        canPrint: true
      }),
      new TerserWebpackPlugin({
        terserOptions: {
          compress: {
            drop_console: true
          },
          format: {
            comments: false
          }
        },
        extractComments: false
      })
    ],
    splitChunks: {
      cacheGroups: {
        // 首先: 打包node_modules中的文件
        vendor: {
          name: 'vendor',
          test: /node_modules/,
          chunks: 'initial',
          minChunks: 3,
          priority: 20
        }
        // styles: {
        //   name: 'common',
        //   test: /\.css$/,
        //   chunks: 'initial',
        //   priority: 10,
        //   enforce: true
        // },
        // common: {
        //   name: 'common',
        //   test: /\.js$/,
        //   chunks: 'initial',
        //   minSize: 1,
        //   priority: 10,
        //   minChunks: 2
        // },
      }
    }
  }
})
