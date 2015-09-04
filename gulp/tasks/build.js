var gulp = require("gulp");
var ts = require("gulp-typescript");

var config = require("../config");
var source = require('vinyl-source-stream');

gulp.task("build", ["build:source", "build:test", "build:browser"]);

gulp.task("build:source", function () {
  return gulp.src(config.path.source + config.glob.typescript)
    .pipe(ts(config.typescript))
    .pipe(gulp.dest(config.path.build + "/js/src"))
    .pipe(gulp.dest(config.path.release + "/node"));
});

gulp.task("build:test", function () {
  return gulp.src(config.path.test + config.glob.typescript)
    .pipe(ts(config.typescript))
    .pipe(gulp.dest(config.path.build + "/js/test"));
});

gulp.task("build:browser", ["build:source"], function () {
  var browserify = require("browserify");
  browserify(config.path.build + "/js/src" + "/to-hyperscript/converter.js", {standalone:"createCompactDomToHyperscriptConverter"})
    .bundle()
    .pipe(source('compact-dom-to-hyperscript-converter.js'))
    .pipe(gulp.dest(config.path.release + "/browser"));
});
