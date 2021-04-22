process.env.NODE_ENV = 'development'

const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const opn = require('opn')
const local = require('./local.dev.js')
const webpackDevConfig = require('./webpack.config.dev')

const app = express()
const compiler = webpack(webpackDevConfig)

const webpackDevMiddlewareInstance = webpackDevMiddleware(compiler, {
  publicPath: webpackDevConfig.output.publicPath,
  stats: {
    colors: true,
    chunks: false
  }
})

const webpackHotMiddlewareInstance = webpackHotMiddleware(compiler)

app.use(webpackDevMiddlewareInstance)
app.use(webpackHotMiddlewareInstance)

app.use('/static', express.static('./static'))

module.exports = app.listen(local.dev.port, err => {
  if (err) {
    console.log(err)
    return
  }

  const uri = 'http://localhost:' + local.dev.port + local.dev.autoOpenBrowserURL
  console.log('Listening at ' + uri + '\n')

  if (local.dev.autoOpenBrowser) {
    opn(uri)
  }
})
