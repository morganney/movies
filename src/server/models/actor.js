'use strict'

import DB from './db'
import unique from 'array-uniq'

class Actor {
  constructor (id) {
    this._id = id
    this._props = null
  }

  fetchAll () {
    return DB.getActors()
  }

  fetch () {
    return new Promise((resolve, reject) => {
      DB.getTables().then((tables) => {
        let id = parseInt(this.id, 10)
        let movies = tables[0]
        let directors = tables[1]
        let actors = tables[2]
        let links = tables[3]
        let actor = actors.find(function (actor) { return actor.id === id })

        if (!actor) {
          actor = {}
        } else {
          actor.movies = []
          actor.directors = []
          links.forEach(function (link) {
            if (link.actorID === id) {
              movies.forEach(function (movie) {
                if (movie.id === link.movieID) {
                  actor.movies.push(movie)
                  actor.directors.push(directors.find(function (director) {
                    return director.id === movie.directorID
                  }))
                }
              })
            }
          })
          if (actor.directors.length) {
            actor.directors = unique(actor.directors)
          }
        }

        this.props = actor
        resolve(this.props)
      }).catch(function (err) {
        reject(err)
      })
    })
  }

  get id () {
    return this._id
  }

  get props () {
    return this._props
  }

  set props (props) {
    this._props = props
  }
}

export default Actor
