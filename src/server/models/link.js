'use strict'

import fs from 'fs'

class Link {
  constructor (id) {
    this._id = id
    this._file = `${__dirname}/../linkActorsToMovies.json`
    this._props = null
  }

  fetchAll () {
    return new Promise((resolve, reject) => {
      fs.readFile(this.file, (err, buff) => {
        if (err) {
          reject(err)
        } else {
          let links = JSON.parse(buff.toString())

          links.forEach(function (link) {
            link.id = parseInt(link.id, 10)
            link.movieID = parseInt(link.movieID, 10)
            link.actorID = parseInt(link.actorID, 10)
          })
          this.props = links
          resolve(links)
        }
      })
    })
  }

  fetch () {
    return new Promise((resolve, reject) => {
      this.fetchAll().then((links) => {
        let link = links.find((link) => {
          return link.id === parseInt(this.id, 10)
        })

        this.props = link || {}
        resolve(this.props)
      }).catch(function (err) {
        reject(err)
      })
    })
  }

  get id () {
    return this._id
  }

  get file () {
    return this._file
  }

  get props () {
    return this._props
  }

  set props (props) {
    this._props = props
  }
}

export default Link
