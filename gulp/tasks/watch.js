var gulp = require("gulp");
var ts = require("gulp-typescript");

var config = require("../config");

var tsProject = ts.createProject(config.typescript);

gulp.task("watch", ["watch:compile"], function () {
  gulp.watch(
    config.path.source + "/**/*.ts",
    ["watch:compile"]
  );
});

gulp.task("watch:compile", function () {
  var tsResult = gulp
    .src(config.path.source + "/**/*.ts")
    .pipe(ts(tsProject));

  return tsResult
    .js
    .pipe(gulp.dest(config.path.build+"/js/src"));
});
