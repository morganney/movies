'use strict'

import express from 'express'

let movie = express.Router()

movie.get('/', function (req, res) {
  res.render('home', {title: 'IQEval | Movie Relationships'})
})

export default movie
