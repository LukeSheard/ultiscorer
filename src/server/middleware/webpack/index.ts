import debug from "debug";
import * as webpackDevMiddleware from "webpack-dev-middleware";
import compiler from "./compiler";

const log = debug("app:webpack:dev");

export default webpackDevMiddleware(compiler, {
  error: log,
  log,
  publicPath: "/",
  serverSideRender: true,
  stats: {
    colors: true
  },
  warn: log
});
