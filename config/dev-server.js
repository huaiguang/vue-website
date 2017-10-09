const path = require('path')
const express = require('express')
const webpack = require('webpack')
const opn = require('opn')
const local = require('./local.dev.js')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackConfig = require('./webpack.config.dev')

const app = express()
const compiler = webpack(webpackConfig)

const webpackDevMiddlewareInstance = webpackDevMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath,
  stats: {
    colors: true,
    chunks: false
  }
})

const webpackHotMiddlewareInstance = webpackHotMiddleware(compiler)
compiler.plugin('compilation', compilation => {
  compilation.plugin('html-webpack-plugin-after-emit', (data, cb) => {
    webpackHotMiddlewareInstance.publish({
      action: 'reload'
    })
    cb()
  })
})

app.use(webpackDevMiddlewareInstance)
app.use(webpackHotMiddlewareInstance)

app.use('/static', express.static('./static'))

module.exports = app.listen(local.dev.port, err => {
  if (err) {
    console.log(err)
    return
  }

  const uri = 'http://localhost:' + local.dev.port + local.dev.autoOpenBrowserURL;
  console.log('Listening at ' + uri + '\n')

  if (local.dev.autoOpenBrowser) {
    opn(uri)
  }
})
