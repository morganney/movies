'use strict'

// import _ from 'underscore'
import Backbone from 'backbone'
import Movie from '../models/movie'
import config from '../core/config'

let Movies = Backbone.Collection.extend({
  model: Movie,

  initialize (models = null, options) {
    console.log('new')
  },

  url () {
    return `${config.API_ROOT}/movies`
  }
})

export default Movies
