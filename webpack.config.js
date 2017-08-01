// basic config
// module.exports = {
//   // 生成 source-map
//   devtool: 'eval-source-map',
//   entry: {
//     index: __dirname + '/app/main.js'
//   },
//   output: {
//     path: __dirname + '/static',
//     filename: '[name].[hash].js'
//   },
// }

// new config
const path = require('path')

module.exports = (options = {}) => ({
  entry: {
    index: __dirname + '/src/app/main.js'
  },
  output: {
    path: __dirname + '/src/static/js',
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          __dirname + '/src/app'
        ],
        exclude: [
          __dirname + '/node_modules'
        ],
        loader: 'babel-loader'
      }
    ]
  },
  // devServer
  devServer: {
    contentBase: './src',
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
    historyApiFallback: true,
    hot: true,
    inline: true
  }
})