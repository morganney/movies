'use strict'

import fs from 'fs'

class Director {
  constructor (id) {
    this._id = id
    this._props = null
    this._file = `${__dirname}/../directors.json`
  }

  fetchAll () {
    return new Promise((resolve, reject) => {
      fs.readFile(this.file, (err, buff) => {
        if (err) {
          reject(err)
        } else {
          let directors = JSON.parse(buff.toString())

          directors.forEach(function (director) {
            director.id = parseInt(director.id, 10)
          })
          this.props = directors
          resolve(directors)
        }
      })
    })
  }

  fetch () {
    return new Promise((resolve, reject) => {
      Promise.all([
        this.fetchAll()
      ]).then((promises) => {
        let id = parseInt(this.id, 10)
        let directors = promises[0]
        let director = directors.find(function (director) {
          return director.id === id
        })

        this.props = director || {}
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

  set props (props) {
    this._props = props
  }

  get props () {
    return this._props
  }
}

export default Director
