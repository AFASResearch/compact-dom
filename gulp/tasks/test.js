var gulp = require("gulp");
var mocha = require("gulp-mocha");
var config = require("../config");

var configMocha = {
  reporter: "spec"
}

gulp.task("test", ["build:source", "build:test"], function () {
  return gulp
    .src(config.path.build + "/js/test" + config.glob.javascript)
    .pipe(mocha(configMocha));
});
