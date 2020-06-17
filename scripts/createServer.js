const PORT = 8009 //端口
const DIR = 'dist' //用于存放html的目录

const http = require('http')
const url = require('url')
const fs = require('fs')
const path = require('path')
const mine = require('./mine').types

const server = http.createServer((request, response) => {
  const pathname = url.parse(request.url).pathname
  const realPath = path.join(DIR, pathname)
  const ext = path.extname(realPath)
  ext = ext ? ext.slice(1) : 'unknown'
  fs.exists(realPath, exists => {
    if (!exists) {
      response.writeHead(404, {
        'Content-Type': 'text/plain'
      })
      response.write('This request URL ' + pathname + ' was not found on this server.')
      response.end()
    } else {
      fs.readFile(realPath, 'binary', (err, file) => {
        if (err) {
          response.writeHead(500, {
            'Content-Type': 'text/plain'
          })
          response.end(err)
        } else {
          const contentType = mine[ext] || 'text/plain'
          response.writeHead(200, {
            'Content-Type': contentType
          })
          response.write(file, 'binary')
          response.end()
        }
      })
    }
  })
})

server.listen(PORT)

console.log('Server runing at port: ' + PORT + '.')
