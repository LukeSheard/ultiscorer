import debug from "debug";
import * as Express from "express";
import config from "../../../config";
import mongoose from "../models/db";
import api from "./";

const app = Express();

app.use("/api", api);

const log = debug("api:server");

interface IMongooseOptions extends mongoose.ConnectionOptions {
  useMongoClient: boolean;
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
