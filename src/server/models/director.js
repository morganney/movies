'use strict'

import DB from './db'
import unique from 'array-uniq'

class Director {
  constructor (id) {
    this._id = id
    this._props = null
  }

  fetchAll () {
    return DB.getDirectors()
  }

  fetch () {
    return new Promise((resolve, reject) => {
      DB.getTables().then((tables) => {
        let id = parseInt(this.id, 10)
        let movies = tables[0]
        let directors = tables[1]
        let actors = tables[2]
        let links = tables[3]
        let director = directors.find(function (director) {
          return director.id === id
        })

        if (!director) {
          director = {}
        } else {
          director.actors = []
          director.movies = []
          movies.forEach(function (movie) {
            if (movie.directorID === id) {
              director.movies.push(movie)
              links.forEach(function (link) {
                if (link.movieID === movie.id) {
                  director.actors.push(actors.find(function (actor) {
                    return actor.id === link.actorID
                  }))
                }
              })
            }
          })
          if (director.actors.length) {
            director.actors = unique(director.actors)
          }
        }

        this.props = director
        resolve(this.props)
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

export default Director
