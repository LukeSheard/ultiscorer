import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as Express from "express";
import config from "../../../config";

import content from "./middleware/content-type";
import error from "./middleware/error";
import notfound from "./middleware/notfound";

/**
 * Register Models
 */
import "../../models/club";
import "../../models/division";
import "../../models/game";
import "../../models/point";
import "../../models/team";
import "../../models/tournament";
import "../../models/user";

import auth from "./routes/auth";
import club from "./routes/club";
import division from "./routes/division";
import game from "./routes/game";
import team from "./routes/team";
import tournament from "./routes/tournament";
import user from "./routes/user";

const app = Express();

app.use(content);

app.use(bodyParser.json());
app.use(cookieParser(config.COOKIE_SECRET));

app.use("/auth", auth);
app.use("/club", club);
app.use("/division", division);
app.use("/game", game);
app.use("/team", team);
app.use("/tournament", tournament);
app.use("/user", user);

app.get("*", notfound);
app.use(error);

export default app;
