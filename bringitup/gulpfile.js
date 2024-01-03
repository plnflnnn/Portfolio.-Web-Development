const gulp = require('gulp');
const browserSync = require('browser-sync');
const webpack = require('webpack-stream');

gulp.task('server', function() {

	browserSync({
		server: {
			baseDir: 'dist'
		},
	});

	gulp.watch('src/*.html').on('change', browserSync.reload);
});

gulp.task('watch', function() {
	gulp.watch('src/js/**/*').on('all', gulp.parallel('build-prod-js'));
});

gulp.task('build-prod-js', () => {
	return gulp.src('./src/js/main.js')
		.pipe(webpack({
			mode: 'production',
			output: {
				filename: 'script.js'
			},
			module: {
				rules: [
					{
						test: /\.m?js$/,
						exclude: /(node_modules|bower_components)/,
						use: {
							loader: 'babel-loader',
							options: {
								presets: [['@babel/preset-env', {
									corejs: 3,
									useBuiltIns: 'usage'
								}]]
							}
						}
					}
				]
			}
		}))
		.pipe(gulp.dest('./dist/'));
});

gulp.task('default', gulp.parallel('watch', 'server', 'build-prod-js'));