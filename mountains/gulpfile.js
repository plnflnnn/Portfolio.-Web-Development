const gulp        = require('gulp');
const browserSync = require('browser-sync');
const sass        = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');

gulp.task('server', function() {

	browserSync({
		server: {
			baseDir: 'dist'
		}
	});

	gulp.watch('src/*.html').on('change', browserSync.reload);
});

gulp.task('styles', function() {
	return gulp.src('src/css/**.+(scss|sass|css)')
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(rename({suffix: '.min', prefix: ''}))
		.pipe(autoprefixer())
		.pipe(cleanCSS({compatibility: 'ie8'}))
		.pipe(gulp.dest('dist/css'))
		.pipe(browserSync.stream());
});

gulp.task('html', function () {
	return gulp.src('src/*.html')
		.pipe(htmlmin({ collapseWhitespace: true }))
		.pipe(gulp.dest('dist/'));
});

gulp.task('icons', function () {
	return gulp.src('src/icons/**/*')
		.pipe(gulp.dest('dist/icons'))
		.pipe(browserSync.stream());
});

gulp.task('images', function () {
	return gulp.src('src/img/**/*')
		.pipe(imagemin())
		.pipe(gulp.dest('dist/img'))
		.pipe(browserSync.stream());
});

gulp.task('watch', function() {
	gulp.watch('src/css/**.+(scss|sass|css)', gulp.parallel('styles'));
	gulp.watch('src/*.html').on('change', gulp.parallel('html'));
	gulp.watch('src/icons/**/*').on('all', gulp.parallel('icons'));
	gulp.watch('src/img/**/*').on('all', gulp.parallel('images'));
});


gulp.task('default', gulp.parallel('server', 'watch', 'styles', 'icons', 'html', 'images'));
