'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function(){
   gulp.src('./src/scss/*.scss')
       .pipe(sass().on('error', sass.logError))
       .pipe(gulp.dest('./build'))
       .pipe(autoprefixer({
           browsers: ['last 2 versions'],
           cascade: false,
           flexbox: "no-2009"
       }))
});

gulp.task('sass:watch', function () {
   gulp.watch('./src/scss/*.scss', ['sass']);
});