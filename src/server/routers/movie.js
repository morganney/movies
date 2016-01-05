'use strict'

import express from 'express'
import DB from '../models/db'

let movie = express.Router()

movie.get('/', function (req, res) {
  res.render('home', {title: 'Movie Relationships'})
})

movie.get('/movies', function (req, res) {
  DB.getMovies().then(function (movies) {
    res.render('movies', {title: 'Movies', movies})
  }).catch(function () {
    res.status(500).render('ise')
  })
})

movie.get('/directors', function (req, res) {
  DB.getDirectors().then(function (directors) {
    res.render('directors', {title: 'Directors', directors})
  }).catch(function () {
    res.status(500).render('ise')
  })
})

movie.get('/actors', function (req, res) {
  DB.getActors().then(function (actors) {
    res.render('actors', {title: 'Actors', actors})
  }).catch(function () {
    res.status(500).render('ise')
  })
})

export default movie
