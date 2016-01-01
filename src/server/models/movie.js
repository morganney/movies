'use strict'

import DB from './db'

class Movie {
  constructor (id) {
    this._id = id
    this._props = null
  }

  fetchAll () {
    return DB.getMovies()
  }

  fetch () {
    return new Promise((resolve, reject) => {
      DB.getTables().then((tables) => {
        let id = parseInt(this.id, 10)
        let movies = tables[0]
        let directors = tables[1]
        let actors = tables[2]
        let links = tables[3]
        let movie = movies.find(function (movie) { return movie.id === id })

        if (!movie) {
          movie = {}
        } else {
          movie.actors = []
          movie.links = []
          movie.director = directors.find(function (director) {
            return director.id === movie.directorID
          })
          links.forEach(function (link) {
            if (link.movieID === id) {
              movie.links.push(link)
              movie.actors.push(actors.find(function (actor) {
                return actor.id === link.actorID
              }))
            }
          })
        }

        this.props = movie
        resolve(movie)
      }).catch(function (err) {
        reject(err)
      })
    })
  }

  get id () {
    return this._id
  }

  set props (props) {
    this._props = props
  }

  get props () {
    return this._props
  }
}

export default Movie
