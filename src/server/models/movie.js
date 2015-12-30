'use strict'

import fs from 'fs'
import Director from './director'
import Link from './link'
import Actor from './actor'

let director = new Director(null)
let link = new Link(null)
let actor = new Actor(null)

class Movie {
  constructor (id) {
    this._id = id
    this._props = null
    this._file = `${__dirname}/../movies.json`
  }

  fetchAll () {
    return new Promise((resolve, reject) => {
      fs.readFile(this._file, (err, buff) => {
        if (err) {
          reject(err)
        } else {
          let movies = JSON.parse(buff.toString())

          movies.forEach(function (movie) { movie.id = parseInt(movie.id, 10) })
          this.props = movies
          resolve(movies)
        }
      })
    })
  }

  fetch () {
    return new Promise((resolve, reject) => {
      Promise.all([
        this.fetchAll(),
        director.fetchAll(),
        link.fetchAll(),
        actor.fetchAll()
      ]).then((promises) => {
        let movies = promises[0]
        let directors = promises[1]
        let links = promises[2]
        let actors = promises[3]
        let movie = movies.find((movie) => {
          return movie.id === parseInt(this.id, 10)
        })

        if (!movie) {
          movie = {}
        } else {
          movie.actors = []
          movie.links = []
          movie.director = directors.find((director) => {
            return director.id === movie.directorID
          })
          links.forEach((link) => {
            if (link.movieID === parseInt(this.id, 10)) {
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
