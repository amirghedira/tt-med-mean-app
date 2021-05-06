const http = require('http2')
const app = require('./app')
const server = http.createServer(app)
server.listen(5000)