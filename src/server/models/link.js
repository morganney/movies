'use strict'

import DB from './db'

class Link {
  constructor (id) {
    this._id = id
    this._props = null
  }

  fetchAll () {
    return DB.getLinks()
  }

  fetch () {
    return new Promise((resolve, reject) => {
      this.fetchAll().then((links) => {
        let id = parseInt(this.id, 10)
        let link = links.find(function (link) { return link.id === id })

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

  get props () {
    return this._props
  }

  set props (props) {
    this._props = props
  }
}

export default Link
