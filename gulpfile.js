'use strict';
const gulp = require('gulp');
const less = require('gulp-less');
const sourcemaps = require('gulp-sourcemaps');

const input = './src/assets/less/style.less';
const output = './src/assets/css';

gulp.task('prod', function () {
    return gulp
        .src(input)
        .pipe(less({
            errLogToConsole: true,
            outputStyle: 'compressed'
        }))
        .pipe(gulp.dest(output));
});

gulp.task('dev', function () {
    return gulp
        .src(input)
        .pipe(sourcemaps.init())
        .pipe(less({
            errLogToConsole: true,
            outputStyle: 'nested'
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(output));
});

gulp.task('watch', function () {
    return gulp
        .watch('./src/assets/less/**/*', ['prod'])
        .on('change', function (event) {
            console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
        });
});

gulp.task('default', ['prod']);