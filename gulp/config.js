var config = {};

var BASE = __dirname + "/..";

config.path = {
  build: BASE + "/build",
  release: BASE + "/dist",
  modules: BASE + "/node_modules",
  source: BASE + "/src",
  test: BASE + "/test"
};
config.path.coverage = config.path.build + "/coverage";
config.path.typings = config.path.source + "/typings";

config.glob = {
  typescript: "/**/*.ts",
  javascript: "/**/*.js"
};

config.typescript = {
  emitDecoratorMetadata: true,
  experimentalDecorators: true,
  module: "commonjs",
  noImplicitAny: true,
  sortOutput: true,
  target: "ES5",
  typescript: require("typescript")
}

module.exports = config;
