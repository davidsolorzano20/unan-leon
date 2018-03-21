/**
 * By Luis Solorzano
 */

'use strict'
import gulp from 'gulp'
import less from 'gulp-less'
import sourcemaps from 'gulp-sourcemaps'

const path = './'
const input = 'src/assets/less/style.less'
const output = 'src/assets/css'
const build = 'build'
const build_app = 'build:version'
const react = 'src'

gulp.task('prod', function () {
	return gulp
		.src(input)
		.pipe(less({
			errLogToConsole: true,
			outputStyle: 'compressed'
		}))
		.pipe(gulp.dest(output))
})

gulp.task('dev', function () {
	return gulp
		.src(input)
		.pipe(sourcemaps.init())
		.pipe(less({
			errLogToConsole: true,
			outputStyle: 'nested'
		}))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(output))
})

gulp.task('watch', function () {
	return gulp
		.watch('./src/assets/less/**/*', ['prod'])
		.on('change', function (event) {
			console.log('File ' + event.path + ' was ' + event.type + ', running tasks...')
		})
})

gulp.task('src', function () {
	return gulp.src([path + 'src/**/*', '!./src/index.js', '!./src/assets/less/**'])
		.pipe(gulp.dest(path + build_app + '/' + react))
})

gulp.task('version', function () {
	return gulp.src([path + '/*.json', '!./package-lock.json'])
		.pipe(gulp.dest(path + build_app))
})

gulp.task('app', function () {
	return gulp.src([path + '**', '!./node_modules/**', '!./gulpfile.babel.js', '!./package-lock.json', '!./sweetalert.min.js', '!./electron-builder.yml', '!./.gitignore', '!./README.md'], {base: path})
		.pipe(gulp.dest(path + build))
})

gulp.task('build:version', ['src', 'version'])
gulp.task('build:app', ['app'])
gulp.task('default', ['prod'])