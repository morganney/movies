import gulp from 'gulp'
import babel from 'gulp-babel'
import nodemon from 'gulp-nodemon'
import eslint from 'gulp-eslint'
import less from 'gulp-less'
import del from 'del'

gulp.task('less', ['copy'], function () {
  return gulp.src('src/client/assets/less/*.less')
    .pipe(less())
    .pipe(gulp.dest('dist/public/css'))
})

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
  return gulp.src('src/**/*.{json,jade}')
    .pipe(gulp.dest('dist'))
})

gulp.task('transpile', ['less'], function () {
  return gulp.src(['src/**/*.js', 'index.js'])
    .pipe(babel())
    .pipe(gulp.dest('dist'))
})

gulp.task('develop', ['transpile'], function () {
  let monitor = nodemon({
    script: './dist/index.js',
    ext: 'js,jade,less',
    watch: ['index.js','src'],
    ignore: ['dist'],
    tasks: ['transpile']
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

gulp.task('default', ['develop'])
