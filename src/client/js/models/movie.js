'use strict'

import Backbone from 'backbone'

let Movie = Backbone.Model.extend({
  defaults () {
    return {
      name: null,
      directorID: null,
      releaseYear: null,
      genre: null,
      rating: null
    }
  }
})

export default Movie
