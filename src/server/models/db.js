'use strict'

import fs from 'fs'

let moviesTable = `${__dirname}/../movies.json`
let directorsTable = `${__dirname}/../directors.json`
let actorsTable = `${__dirname}/../actors.json`
let linksTable = `${__dirname}/../linkActorsToMovies.json`

function get (table, isLinks = false) {
  return new Promise(function (resolve, reject) {
    let stream = fs.createReadStream(table, {encoding: 'utf8'})
    let data = ''

    stream.on('readable', function () {
      let chunk = stream.read()

      if (chunk) {
        data += chunk
      }
    })

    stream.on('error', function (err) {
      reject(err)
    })

    stream.on('end', function () {
      try {
        let rows = JSON.parse(data)

        if (isLinks) {
          rows.forEach(function (row) {
            row.id = parseInt(row.id, 10)
            row.movieID = parseInt(row.movieID, 10)
            row.actorID = parseInt(row.actorID, 10)
          })
        } else {
          rows.forEach(function (row) { row.id = parseInt(row.id, 10) })
        }
        resolve(rows)
      } catch (err) {
        reject(err)
      }
    })
  })
}

class DB {
  static getMovies () {
    return get(moviesTable)
  }

  static getDirectors () {
    return get(directorsTable)
  }

  static getActors () {
    return get(actorsTable)
  }

  static getLinks () {
    return get(linksTable, true)
  }

  static getTables () {
    return Promise.all([
      DB.getMovies(),
      DB.getDirectors(),
      DB.getActors(),
      DB.getLinks()
    ])
  }
}

export default DB
