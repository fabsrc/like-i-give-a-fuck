const del = require('del')
const gulp = require('gulp')
const zip = require('gulp-zip')
const gulpFilter = require('gulp-filter')
const jsonEditor = require('gulp-json-editor')
const pkg = require('./package.json')

const src = 'src/**/*'
const output = 'output/'
const target = 'like-i-give-a-fuck-' + pkg.version

gulp.task('clean', () => {
  return del([output + '**/*'])
})

gulp.task('build:firefox', () => {
  return gulp.src(src)
      .pipe(zip(target + '.xpi'))
      .pipe(gulp.dest(output))
})

gulp.task('build:chrome', () => {
  const filter = gulpFilter(['*.json'], { restore: true })

  return gulp.src(src)
      .pipe(filter)
      .pipe(jsonEditor((json) => {
        delete json.applications
        return json
      }))
      .pipe(filter.restore)
      .pipe(gulp.dest(output + target))
      .pipe(zip(target + '.zip'))
      .pipe(gulp.dest(output))
})

gulp.task('default', gulp.series('clean', gulp.parallel('build:firefox', 'build:chrome')))
