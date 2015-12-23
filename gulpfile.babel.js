'use strict'

import del          from 'del'
import gulp         from 'gulp'
import zip          from 'gulp-zip'
import gulpFilter   from 'gulp-filter'
import jsonEditor   from 'gulp-json-editor'
import config       from './package.json'

let src = 'src/**/*'
let output = 'output/'
let target = 'like-i-give-a-fuck-' + config.version

gulp.task('clean', () => {
  return del.sync([output + '**/*'])
})

gulp.task('build:firefox', () => {
  gulp.src(src)
      .pipe(zip(target + '.xpi'))
      .pipe(gulp.dest(output))
})

gulp.task('build:chrome', () => {
  let filter = gulpFilter(['*.json'], { restore: true })

  gulp.src(src)
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

gulp.task('build', ['clean', 'build:firefox', 'build:chrome'])
gulp.task('default', ['build'])
