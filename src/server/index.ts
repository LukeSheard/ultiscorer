import * as cookieParser from "cookie-parser";
import "css-modules-require-hook/preset";
import debug from "debug";
import * as Express from "express";
import config, { NODE_ENV } from "../../config";
import mongoose from "./models/db";

import api from "./api";

import identifyUser from "./middleware/identify-user";
import initStore from "./middleware/init-store";
import render from "./middleware/render";
import webpack from "./middleware/webpack";

const log = debug("app:server");

const app: Express.Express = Express();

/*
  Static Files including hot middleware in development
*/
app.use(webpack);
if (process.env.NODE_ENV !== NODE_ENV.PRODUCTION) {
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

interface IMongooseOptions extends mongoose.ConnectionOptions {
  useMongoClient: boolean;
}

webpack.waitUntilValid(() => {
  /*
    Webpack Middleware
    NOTE: In Production we close the middleware to stop looking for updates.
  */
  if (process.env.NODE_ENV === NODE_ENV.PRODUCTION) {
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
      app.listen(8080, () => {
        log("Server started");
      });
    })
    .catch(mongooseErr => {
      log(mongooseErr);
      process.exit(1);
    });
});
