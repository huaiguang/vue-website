const path = require('path');
const webpack = require('webpack');

const devConfig = {
  entry: {
    index: path.resolve(__dirname, 'src/**/main.js')
  },
  output: {
    path: path(__dirname, 'dist/static/js')
    filename: [name].[hash].js,
    publicPath: 'static/js'
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, '../src'),
      common: path.resolve(__dirname, '../src/common')
    }
  }
}
