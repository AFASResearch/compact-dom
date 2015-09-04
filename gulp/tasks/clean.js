var gulp = require("gulp");
var del = require("del");
var config = require("../config");

gulp.task('clean', function (callback) {
  del([
    config.path.build + "/*",
    config.path.release,
  ], callback);
});