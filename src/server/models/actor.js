'use strict'

import fs from 'fs'

class Actor {
  constructor (id) {
    this._id = id
    this._file = `${__dirname}/../actors.json`
    this._props = null
  }

  fetchAll () {
    return new Promise((resolve, reject) => {
      fs.readFile(this.file, (err, buff) => {
        if (err) {
          reject(err)
        } else {
          let actors = JSON.parse(buff.toString())

          actors.forEach(function (actor) { actor.id = parseInt(actor.id, 10) })
          this.props = actors
          resolve(actors)
        }
      })
    })
  }

  fetch () {
    return new Promise((resolve, reject) => {
      this.fetchAll().then((actors) => {
        let actor = actors.find((actor) => {
          return actor.id === parseInt(this.id, 10)
        })

        this.props = actor || {}
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

export default Actor
