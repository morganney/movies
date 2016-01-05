'use strict'

import gulp from 'gulp'
import babel from 'gulp-babel'
import nodemon from 'gulp-nodemon'
import eslint from 'gulp-eslint'
import less from 'gulp-less'
import nano from 'gulp-cssnano'
import uglify from 'gulp-uglify'
import sourcemaps from 'gulp-sourcemaps'
import source from 'vinyl-source-stream'
import buffer from 'vinyl-buffer'
import browserify from 'browserify'
import watchify from 'watchify'
import merge from 'merge-stream'
import del from 'del'

let bundler = watchify(browserify({
  debug: true,
  // TODO: use babelify and separate concerns
  // between server/client so watchify monitors src
  entries: [
    'dist/client/js/apps/movies.js'
  ]
}))

function bundle () {
  return bundler.bundle()
    .pipe(source('movies.app.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/public/js'))
}

bundler.on('update', bundle)

gulp.task('lint', function () {
  return gulp.src('src/**/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
})

gulp.task('clean', ['lint'], function () {
  return del('dist/*')
})

gulp.task('copy', ['clean'], function () {
  let bootstrap = gulp.src('node_modules/bootstrap/dist/**/*')
    .pipe(gulp.dest('dist/public/css/bootstrap'))
  let j = gulp.src('src/**/*.{json,jade}')
    .pipe(gulp.dest('dist'))

  return merge(bootstrap, j)
})

gulp.task('less', ['copy'], function () {
  return gulp.src('src/client/assets/less/*.less')
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(nano())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/public/css'))
})

gulp.task('transpile', ['less'], function () {
  return gulp.src(['src/**/*.js', 'index.js'])
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist'))
})

gulp.task('bundle', ['transpile'], function () {
  return bundle()
})

gulp.task('develop', ['bundle'], function () {
  let monitor = nodemon({
    script: './dist/index.js',
    ext: 'js,jade,less',
    watch: ['index.js','src'],
    ignore: ['dist'],
    tasks: ['bundle']
  })

  /**
   * Actually end the nodemon process with CTRL+C from the terminal.
   *
   * @see https://github.com/JacksonGariety/gulp-nodemon/issues/77
   */
  process.once('SIGINT', function () {
    monitor.once('exit', function () {
      process.exit()
    })
  })

  return monitor
})

gulp.task('default', ['bundle'])
