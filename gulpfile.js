var gulp = require("gulp");
var del = require("del");
var uglify = require("gulp-uglify");
var minifyCss = require("gulp-minify-css");
var webpack = require("gulp-webpack");

gulp.task("clean", function(done){
	del([
		"dist/**/*"
	]);

	return done();
})

gulp.task("pack", ["clean"], function(done){
	return gulp.src("./src/index.js")
	.pipe(webpack(require("./webpack.config.prod.js")))
	.pipe(gulp.dest("./dist"))
})

gulp.task("build", ["pack"], function(){
	gulp.src("./dist/ThreeHover.js")
	.pipe(uglify({
		compress: { screw_ie8: false },
		mangle: { screw_ie8: false },
		output: { screw_ie8: false }
	}))
	.pipe(gulp.dest("./dist"))

	gulp.src("./dist/bundle.css")
	.pipe(minifyCss())
	.pipe(gulp.dest("./dist"))
})
