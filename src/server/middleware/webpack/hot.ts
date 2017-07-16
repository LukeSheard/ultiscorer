import debug from "debug";
import * as webpackHotMiddleware from "webpack-hot-middleware";
import compiler from "./compiler";

const log = debug("app:webpack:hot");

export default webpackHotMiddleware(compiler, {
  heartbeat: 500,
  log,
  publicPath: "/"
});
