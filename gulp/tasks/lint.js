var gulp = require("gulp");
var tslint = require("gulp-tslint");

var config = require("../config");

gulp.task("lint", function () {
  return gulp.src(
    [
      config.path.source + "/**/*.ts",
      "!" + config.path.typings + "/**/*"
    ]
  )
    .pipe(tslint())
    .pipe(tslint.report("prose", {
      emitError: false
    }));
});
