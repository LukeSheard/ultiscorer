import debug from "debug";
import * as webpackDevMiddleware from "webpack-dev-middleware";
import compiler, { webpackConfig } from "./compiler";

const log = debug("app:webpack:dev");

export default webpackDevMiddleware(compiler, {
  ...webpackConfig.devServer,
  error: log,
  log,
  publicPath: "/",
  serverSideRender: true,
  stats: {
    colors: true
  },
  warn: log
});
