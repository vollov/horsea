//Load all task modules
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var less = require('gulp-less');
var nano = require('gulp-cssnano');

//Process JS files
gulp.task('minify-js', function() {
  return gulp.src([
      'app/js/app.js',
      'app/js/auth/auth.module.js',
      'app/js/auth/auth.controller.js',
      'app/js/auth/auth.service.js',
    ]) //Source files
    .pipe(concat("ocbl.min.js"))
    .pipe(uglify())
    .pipe(gulp.dest('app/js/')); //Destination folder
});

//Process styles
gulp.task('compile-less', function() {
  return gulp.src('app/styles/*.less') //Source files
    .pipe(less()) //Compile Less
    .pipe(nano()) //Minify CSS
    .pipe(concat("ocbl.min.css")) //Combine
    .pipe(gulp.dest('app/styles/')); //Destination folder
});

gulp.task('default', ['minify-js', 'compile-less']);
