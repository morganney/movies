'use strict'

import Backbone from 'backbone'
import Movies from '../collections/movies'

let script = document.currentScript
let MoviesApp = Backbone.View.extend({
  initialize (options = {}) {
    this.collection = new Movies(options.movies)
    this.listenTo(this.collection, 'change', this.render)
    this.render()
  },

  render () {
    console.log(this.collection.models)
  }
})

export default new MoviesApp({movies: JSON.parse(script.dataset.collection)})
