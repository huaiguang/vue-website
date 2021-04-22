const path = require('path')
const glob = require('glob')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ESLintWebpackPlugin = require('eslint-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const htmlHandler = require('./html-handler')
const config = require('../config')
const devMode = process.env.NODE_ENV !== 'production'

function getEntriesWithHMR(globPath) {
  const entries = {}
  glob.sync(globPath).forEach(entry => {
    const tmp = entry.split('/').splice(-2)
    entries[tmp[0]] = ['eventsource-polyfill', entry]
  })
  return entries
}

const entries = getEntriesWithHMR('./src/**/main.js')

module.exports = {
  entry: entries,
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: devMode ? 'static/js/[name].[hash:8].js' : 'static/js/[name].[chunkhash:8].js',
    publicPath: devMode ? config.dev.assetsPublicPath : config.build.assetsPublicPath
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: devMode ? 'style-loader' : MiniCssExtractPlugin.loader
          },
          { loader: 'css-loader' }
        ]
      },
      {
        test: /\.scss/,
        use: [
          {
            loader: devMode ? 'style-loader' : MiniCssExtractPlugin.loader
          },
          { loader: 'css-loader' },
          { loader: 'sass-loader' }
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: devMode
                ? 'static/images/[name].[hash:8].[ext]'
                : 'static/images/[name].[contenthash:8].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(eot|ttf|woff2?|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              publicPath: '../../',
              name: devMode
                ? 'static/fonts/[name].[hash:8].[ext]'
                : 'static/fonts/[name].[contenthash:8].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: devMode ? 'static/css/[name].[hash:8].css' : 'static/css/[name].[contenthash:8].css'
    }),
    new ESLintWebpackPlugin()
  ].concat(
    htmlHandler({
      template: path.resolve(__dirname, '../public/index.html'),
      chunks: ['manifest', 'vendor'],
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttrbuteQuotes: true
      }
    })
  ),
  resolve: {
    alias: {
      // 'vue$': 'vue/dist/vue.esm.js',
      '@': path.resolve(__dirname, '../src/'),
      common: path.resolve(__dirname, '../src/common/')
    },
    aliasFields: ['browser'],
    descriptionFiles: ['package.json'],
    enforceExtension: false,
    enforceModuleExtension: false,
    extensions: ['.js', '.vue'],
    mainFields: ['browser', 'module', 'main'],
    mainFiles: ['index'],
    modules: ['app', 'node_modules'],
    unsafeCache: true
  },
  resolveLoader: {
    modules: ['web_loaders', 'web_modules', 'node_loaders', 'node_modules'],
    extensions: ['.webpack-loader.js', '.web-loader.js', '.loader.js', '.js'],
    moduleExtensions: []
  },
  target: 'web'
}
