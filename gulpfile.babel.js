/**
 * By Luis Solorzano
 */

'use strict'

import gulp from 'gulp'
import sass from 'gulp-sass'
import babel from 'gulp-babel'
import del from 'del'
import cleanCSS from 'gulp-clean-css'
import server from 'gulp-server-livereload';
import config from './package.json'

const paths = {
	dest: 'build',
	src: 'src',
	package: `out/${config.version}`,
	html: {
		src: 'src/**/*.html',
		dest: 'build/src',
		watch: 'src/**/*.html',
	},
	styles: {
		src: 'src/assets/sass/style.scss',
		dest: 'build/src/assets/css',
		watch: 'src/assets/sass/**/*.scss',
	},
	fonts: {
		src: 'src/assets/fonts/*',
		dest: 'build/src/assets/fonts',
	},
	images: {
		src: 'src/assets/img/*',
		dest: 'build/src/assets/img',
	},
	reactjs: {
		src: 'src/**/*.jsx',
		dest: 'build/src',
		watch: 'src/**/*.jsx',
	},
	scripts: {
		src: 'src/**/*.js',
		dest: 'build/src',
		watch: 'src/**/*.js',
	},
	version: {
		src: 'version/*.json',
		dest: 'build/version',
		watch: 'version/*.json',
	},
	packages: {
		src: './*.json',
		dest: 'build/version',
		watch: 'version/*.json',
	},
}

export const clean = () => del(['assets'])

export function styles () {
	return gulp.src(paths.styles.src)
		.pipe(sass({
			errLogToConsole: true,
			outputStyle: 'nested'
		}).on('error', sass.logError))
		.pipe(cleanCSS())
		.pipe(gulp.dest(paths.styles.dest))
}

export function scripts () {
	return gulp.src(paths.scripts.src, {sourcemaps: false})
		.pipe(babel())
		.pipe(gulp.dest(paths.scripts.dest))
}

export function reactjs () {
	return gulp.src(paths.reactjs.src, {sourcemaps: false})
		.pipe(babel())
		.pipe(gulp.dest(paths.reactjs.dest))
}

export function html () {
	return gulp.src(paths.html.src)
		.pipe(gulp.dest(paths.html.dest))
}

export function version () {
	return gulp.src(paths.version.src)
		.pipe(gulp.dest(paths.version.dest))
}

export function fonts () {
	return gulp.src(paths.fonts.src)
		.pipe(gulp.dest(paths.fonts.dest))
}

export function images () {
	return gulp.src(paths.images.src)
		.pipe(gulp.dest(paths.images.dest))
}

export function src () {
	return gulp.src(
		[
			`${paths.src}/*`,
			`${paths.src}/*/**`,
			`!${paths.scripts.watch}`,
			`!${paths.reactjs.watch}`,
			`!${paths.src}/assets/sass/**`,
		], {since: gulp.lastRun(src)})
		.pipe(gulp.dest(paths.dest))
}

export function mvpackage () {
	return gulp.src(
		[
			'./package.json',
			'./version.json',
		])
		.pipe(gulp.dest(paths.dest))
}

export function watch () {
	gulp.watch(paths.scripts.src, scripts)
	gulp.watch(paths.reactjs.src, reactjs)
	gulp.watch(paths.styles.src, styles)
	gulp.watch(paths.html.src, html)
}

export function webserver() {
	gulp.src([
		paths.dest,
	])
		.pipe(server({
			livereload: true,
		}));
}

const build = gulp.series(clean, gulp.parallel(mvpackage), gulp.parallel(html, fonts, images, styles, scripts, reactjs, version))
export default build

const dev = gulp.series(build, gulp.parallel(webserver, watch))
export { dev }
