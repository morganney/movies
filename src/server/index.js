'use strict'

import express from 'express'
import movie from './routers/movie'
import api from './routers/api'

let app = express()
let server = {}

app.set('views', `${__dirname}/views`)
app.set('view engine', 'jade')

app.use(express.static(`${__dirname}/../public`))
app.use(movie)
app.use('/api', api)

server.listen = function (port = 3001, cb) {
  app.listen(port, function () {
    if (typeof cb === 'function') {
      cb()
    }
  })
}

export default server
