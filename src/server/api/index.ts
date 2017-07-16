import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as Express from "express";
import config from "../../../config";
import content from "./middleware/content-type";
import auth from "./routes/auth";

const app = Express();

app.use(content);

app.use(bodyParser.json());
app.use(cookieParser(config.COOKIE_SECRET));

app.use("/auth", auth);

export default app;
