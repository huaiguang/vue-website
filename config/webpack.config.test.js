// new config
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = (options = {}) => ({
  entry: {
    index: path.resolve(__dirname, '../src/test/main.js')
  },
  output: {
    path: path.resolve(__dirname, '../dist/js'),
    filename: '[name].[hash].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, '../src'),
        exclude: path.resolve(__dirname, '/node_modules'),
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'test.html',
      filename: '../home.html',
      favicon: path.resolve(__dirname, '../public/favicon.ico'),
      template: path.resolve(__dirname, '../public/index.html')
    }),
    new ExtractTextPlugin({
      filename: '../css/style.css'
    })
  ],
  resolve: {
    alias: {
      src: path.resolve(__dirname, '../src'),
      common: path.resolve(__dirname, '../src/common'),
      dist: path.resolve(__dirname, '../dist')
    }
  },
  // devServer
  devServer: {
    contentBase: path.resolve(__dirname, '../dist'),
    // host: '127.0.0.1',
    port: 8009,
    // proxy: {
    //   'api': {
    //     target: 'http://127.0.0.1:8009',
    //     changeOrigin: true,
    //     pathRewrite: {
    //       '^/api': ''
    //     }
    //   }
    // },
    historyApiFallback: true
  }
})
