import * as cookieParser from "cookie-parser";
import "css-modules-require-hook/preset";
import debug from "debug";
import * as Express from "express";
import * as querystring from "querystring";
import * as raven from "raven";

import config, { __DEV__ } from "../../config";
import mongoose from "./models/db";

import api from "./api";

import identifyUser from "./middleware/identify-user";
import initStore from "./middleware/init-store";
import render from "./middleware/render";
import webpack from "./middleware/webpack";

const log = debug("app:server");

const app: Express.Express = Express();

/*
  Config
*/
raven.config(config.SENTRY_DSN).install();
app.use(raven.requestHandler());

/*
  Static Files including hot middleware in development
*/
app.use(webpack);
if (__DEV__) {
  log("Initializing Hot Middleware");
  const hotWebpack = require("./middleware/webpack/hot").default;
  app.use(hotWebpack);
}

/*
  API
*/
app.use("/api", api);

/*
  Render Page
*/
app.use(cookieParser(config.COOKIE_SECRET));
app.use(initStore);
app.use(identifyUser);
app.get("*", render);

/**
 * Error Handlers
 */
app.use(raven.errorHandler());
app.use(
  (
    error: Error,
    _: Express.Request,
    res: Express.Response,
    __: Express.NextFunction
  ) => {
    log("Error occurred: %s", error.message);
    res.status(500);
    return res.redirect(
      `/error${querystring.stringify({
        sentry: (res as any).sentry
      })}`
    );
  }
);

interface IMongooseOptions extends mongoose.ConnectionOptions {
  useMongoClient: boolean;
}

webpack.waitUntilValid(() => {
  /*
    Webpack Middleware
    NOTE: In Production we close the middleware to stop looking for updates.
  */
  if (!__DEV__) {
    webpack.close();
  }
  mongoose
    .connect(
      config.MONGODB_URI,
      {
        useMongoClient: true
      } as IMongooseOptions
    )
    .then(() => {
      log("Connected to database");
      app.listen(config.PORT, () => {
        log("Server started");
      });
    })
    .catch(mongooseErr => {
      log(mongooseErr);
      process.exit(1);
    });
});
