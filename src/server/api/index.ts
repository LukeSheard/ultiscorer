import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as Express from "express";
import config from "../../../config";

import content from "./middleware/content-type";
import error from "./middleware/error";

import auth from "./routes/auth";
import division from "./routes/division";
import game from "./routes/game";
import team from "./routes/team";
import tournament from "./routes/tournament";

const app = Express();

app.use(content);

app.use(bodyParser.json());
app.use(cookieParser(config.COOKIE_SECRET));

app.use("/auth", auth);
app.use("/division", division);
app.use("/game", game);
app.use("/team", team);
app.use("/tournament", tournament);

app.use(error);

export default app;
