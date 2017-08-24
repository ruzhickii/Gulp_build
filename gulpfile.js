'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    rigger = require('gulp-rigger'),
    livereload = require('gulp-livereload'),
    imagemin = require('gulp-imagemin'),
    connect = require('gulp-connect');


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


gulp.task('html', function(){
    gulp.src('./src/html/*.html')
        .pipe(rigger())
        .pipe(gulp.dest('./build'))
});


gulp.task('watch', function(){
    livereload.listen();
    gulp.watch('./src/html/*.html', ['html']).on('change', livereload.changed);
    gulp.watch('./src/scss/*.scss', ['sass']).on('change', livereload.changed);

});

gulp.task('image-min', function () {
    return gulp.src('./src/img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./build/img/'))
});


gulp.task('connect', function () {
    connect.server({
        root: 'build/',
        livereload: true
    });
});


gulp.task('default', ['sass', 'html', 'connect', 'watch', 'image-min']);