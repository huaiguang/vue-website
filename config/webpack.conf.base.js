const path = require('path');
const glob = require('glob');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const htmlHandler = require('./html-handler');

function getEntriesWithHMR(globPath) {
  const entries = {}
  glob.sync(globPath).forEach(entry => {
    const tmp = entry.split('/').splice(-2)
    entries[tmp[0]] = ['eventsource-polyfill', entry]
  })
  return entries
}

const entries = getEntriesWithHMR('./src/**/main.js');

module.exports = {
  entry: entries,
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    filename: 'js/[name].bundle.js'
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|vue)$/,
        include: path.resolve(__dirname, '../src'),
        exclude: /node_modules/,
        use: [
          {
            loader: 'eslint-loader',
            options: {
              formatter: require("eslint-friendly-formatter")
            }
          }
        ]
      },
      {
        test: /\.vue$/,
        use: {
          loader: 'vue-loader',
          options: {
            loaders: {
              css: ['vue-style-loader', {
                loader: 'css-loader'
              }]
            }
          }
        }
      },
      {
        test: /\.js$/,
        include: path.resolve(__dirname, '../src'),
        exclude: path.resolve(__dirname, '/node_modules'),
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../'
            }
          },
          {loader: 'css-loader'}
        ]
      },
      {
        test: /\.scss/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {}
          },
          {loader: 'css-loader'},
          {loader: 'sass-loader'}
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    }),
    new FriendlyErrorsPlugin(),
    // new webpack.DefinePlugin({
    //   'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    //   'process.env.APP_ENV': JSON.stringify(process.env.APP_ENV),
    //   'process.env.API': JSON.stringify('/api/V4/')
    // }),
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
      src: path.resolve(__dirname, '../src'),
      common: path.resolve(__dirname, '../src/common'),
      dist: path.resolve(__dirname, '../dist')
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