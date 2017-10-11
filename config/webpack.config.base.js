const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const pageConfig = require('./page-config')

function getEntriesWithHMR(globPath) {
  const entries = {}
  glob.sync(globPath).forEach(entry => {
    const tmp = entry.split('/').splice(-2)
    entries[tmp[0]] = ['eventsource-polyfill', entry]
  })
  return entries
}

const entries = getEntriesWithHMR('./src/*/main.js')

let webpackConfig = {
  entry: entries,
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    filename: 'js/[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, '../src'),
        exclude: path.resolve(__dirname, '/node_modules'),
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.APP_ENV': JSON.stringify(process.env.APP_ENV),
      'process.env.API': JSON.stringify('/api/V4/')
    }),
    new webpack.ContextReplacementPlugin(/moment[\\]locale$/, /zh-cn/),
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      title: 'html test',
      filename: 'view/test.html',
      inject: 'body',
      favicon: path.resolve(__dirname, '../public/favicon.ico'),
      template: path.resolve(__dirname, '../public/index.html'),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttrbuteQuotes: true
      }
    })
  ],
  resolve: {
    alias: {
      src: path.resolve(__dirname, '../src'),
      common: path.resolve(__dirname, '../src/common'),
      dist: path.resolve(__dirname, '../dist')
    },
    aliasFields: ['browser'],
    descriptionFiles: ['package.json'],
    enforceExtension: false,
    enforceModuleExtension: false,
    extensions: ['.js', '.vue', '.json'],
    mainFields: ['browser', 'module', 'main'],
    mainFiles: ['index'],
    modules: ['app', 'node_modules'],
    unsafeCache: true
  },
  resolveLoader: {
    modules: ['web_loaders', 'web_modules', 'node_loaders', 'node_modules'],
    extensions: ['.webpack-loader.js', '.web-loader.js', '.loader.js', '.js'],
    // packageMains: ['webpackLoader', 'webLoader', 'loader', 'main'],
    moduleExtensions: []
  },
  target: 'web'
  // devtool: options.devtool,
  // performance: options.performance || {}
}

module.exports = webpackConfig
