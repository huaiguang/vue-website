const path = require('path')
// const fs = require('fs')
const express = require('express')
// const compression = require('compression')
const opn = require('opn')
// const favicon = require('serve-favicon')
// // const cookieParser = require('cookie-parser')
// // const addProxyMiddleware = require('./middlewares/addProxyMiddleware')
// // const addWinstonMiddleware = require('./middlewares/addWinstonMiddleware')
// // const proxyTable = require('./config/proxy-table')
// const logger = require('dev-utils/logger')
// const router = require('./router')
// const app = express()
// const isProd = process.env.NODE_ENV === 'production'
//
// let serverConfig = isProd
//   ? require(resolve(__dirname, './config/prod-server-config'))
//   : require(resolve(__dirname, './config/dev-server-config'))
//
// if (isProd) {
//   const outputPath = resolve(__dirname, '../../dist')
//   const publicPath = '/static'
//   const staticPath = join(outputPath, './static')
//
//   app.set('outputPath', outputPath)
//   app.set('fs', fs)
//
//   app.use(publicPath, express.static(staticPath))
//
//   const faviconPath = join(outputPath, 'favicon.ico')
//   // cache the favicon in memory
//   app.use(favicon(faviconPath))
//
//   // compression middleware compresses your server responses which makes them
//   // smaller (applies also to assets). You can read more about that technique
//   // and other good practices on official Express.js docs http://mxs.is/googmy
//   app.use(compression())
// } else {
//   if (fs.existsSync(serverConfig.localPath)) {
//     serverConfig = Object.assign(serverConfig, require(serverConfig.localPath))
//   }
//
//   const setupDevServer = require(resolve(
//     __dirname,
//     '../../scripts/setupDevServer'
//   ))
//
//   setupDevServer(
//     app,
//     require(resolve(__dirname, '../../config/webpack.conf.dev'))
//   )
// }
//
// // serve fingerprint2 scripts
// app.get('/static/js/fingerprint2.js', (req, res) => {
//   res.sendFile(resolve(__dirname, '../../external/fingerprint2.js'))
// })
//
// // serve pdf files
// app.get('/static/pdf/scan_agreement.pdf', (req, res) => {
//   res.sendFile(resolve(__dirname, '../../external/scan_agreement.pdf'))
// })
//
// app.use(cookieParser())
//
// addProxyMiddleware(app, proxyTable)
//
// app.use(addWinstonMiddleware.logger)
//
// router(app)
//
// app.use(addWinstonMiddleware.errorLogger)
//
// const { port, host, autoOpenBrowserURL } = serverConfig
//
// app.listen(port, host, err => {
//   if (err) {
//     return logger.log(err.message)
//   }
//
//   logger.appStarted(port, host)
//
//   if (!isProd && autoOpenBrowserURL)
//     opn(`http://${host}:${port}${autoOpenBrowserURL}`)
// })

const app = express()
// respond with "hello express" when a GET request is made to the homepage
app.get('/', (req, res) => {
  res.send('hello express!')
})

// 传入静态资源所在的路径
// express.static 基于 server-static
// express.static(root, [options]), root为根目录
app.use(express.static('../dist'))

// app.get('/view/test.html', function(req, res) {
//   res.send('hello world')
// })

// directly output html
// app.get('/view/test.html', function(req, res, next) {
//   var options = {
//     root: path.resolve(__dirname, '../dist'),
//     dotfiles: 'deny',
//     headers: {
//         'x-timestamp': Date.now(),
//         'x-sent': true
//     }
//   }
//
//   res.sendFile('/view/test.html', options, function(err) {
//     if (err) {
//       console.log(err)
//       res.status(err.status).end();
//     } else {
//       console.log('Sent:', res);
//     }
//   })
// })
// problem: the test.html is below the server,but the assets are below the css and js
// ,different from the local,and display abnormal

// after error handing, app.get() can`t work well
// add handing of 404
app.use((req, res, next) => {
  res.status(404).send('Sorry can\'t find that!')
})

// add error handing
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

app.listen(8009, (req, res) => {
  console.log('8009')
})
