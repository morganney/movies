'use strict'

import express from 'express'
import Movie from '../models/movie'
import Director from '../models/director'
import Actor from '../models/actor'

let api = express.Router()
let movies = new Movie(null)
let directors = new Director(null)
let actors = new Actor(null)

api.get('/', function (req, res) {
  res.redirect('/api/movies')
})

api.get('/movies', function (req, res) {
  if (movies.props) {
    res.json({movies: movies.props})
  } else {
    movies.fetchAll().then(function (movies) {
      res.json({movies})
    }).catch(function (err) {
      res.status(500).json({error: err.message})
    })
  }
})

api.get('/movies/:id', function (req, res) {
  let movie = new Movie(req.params.id)

  movie.fetch().then(function (movie) {
    res.json(movie)
  }).catch(function (err) {
    res.status(500).json({error: err.message})
  })
})

api.get('/directors', function (req, res) {
  if (directors.props) {
    res.json({directors: directors.props})
  } else {
    directors.fetchAll().then(function (directors) {
      res.json({directors})
    }).catch(function (err) {
      res.status(500).json({error: err.message})
    })
  }
})

api.get('/directors/:id', function (req, res) {
  let director = new Director(req.params.id)

  director.fetch().then(function (director) {
    res.json(director)
  }).catch(function (err) {
    res.status(500).json({error: err.message})
  })
})

api.get('/actors', function (req, res) {
  if (actors.props) {
    res.json({actors: actors.props})
  } else {
    actors.fetchAll().then(function (actors) {
      res.json({actors})
    }).catch(function (err) {
      res.status(500).json({error: err.message})
    })
  }
})

api.get('/actors/:id', function (req, res) {
  let actor = new Actor(req.params.id)

  actor.fetch().then(function (actor) {
    res.json(actor)
  }).catch(function (err) {
    res.status(500).json({error: err.message})
  })
})

export default api
