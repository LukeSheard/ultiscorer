import debug from "debug";
import * as Express from "express";
import config from "../../../config";
import mongoose from "../../models/db";
import api from "./";

const app = Express();

app.use("/api", api);

const log = debug("api:server");

interface IMongooseOptions extends mongoose.ConnectionOptions {
  useMongoClient: boolean;
}

import "../../models/action";
import "../../models/club";
import "../../models/division";
import "../../models/game";
import "../../models/team";
import "../../models/tournament";
import "../../models/user";

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
