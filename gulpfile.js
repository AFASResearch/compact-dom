var gulp = require("gulp");
var ts = require("gulp-typescript");
var source = require("vinyl-source-stream");
var mocha = require("gulp-mocha");
var del = require("del");
var listing = require("gulp-task-listing");
var tslint = require("gulp-tslint");

var configTypescript = require("./tsconfig.json").compilerOptions;
configTypescript.typescript = require("typescript");
var tsProject = ts.createProject(configTypescript);

gulp.task("build", function() {
  return gulp.src(["src/**/*.ts", "test/**/*.ts"])
    .pipe(ts(tsProject))
    .pipe(gulp.dest("build/js"));
});

gulp.task("watch", ["build"], function() {
  gulp.watch("src/**/*.ts", ["build"]);
});

gulp.task("release:browser", ["build"], function () {
  var browserify = require("browserify");
  return browserify("build/js/src/to-hyperscript/converter.js", {standalone:"createCompactDomToHyperscriptConverter"})
    .bundle()
    .pipe(source("compact-dom-to-hyperscript-converter.js"))
    .pipe(gulp.dest("lib/browser"));
});

gulp.task("test", ["build", "release"], function () { // Release here somehow circumvents clash between mocha and browserify when running the all task 
  return gulp
    .src("build/js/test/**/*.js")
    .pipe(mocha({
       reporter: "spec"
    }));
});

gulp.task("clean", function (callback) {
  return del([
    "build/*",
    "lib/*",
  ], callback);
});

gulp.task("help", listing);

gulp.task("lint", function () {
  return gulp.src(["src/**/*.ts", "test/**/*.ts"])
    .pipe(tslint())
    .pipe(tslint.report("prose", {
      emitError: false
    }));
});

gulp.task("release", ["build", "release:browser"], function(){
  return gulp.src("build/js/src/**/*.js")
    .pipe(gulp.dest("lib"));
});

gulp.task("all", ["build", "test", "release"]);

gulp.task("default", ["build"]);