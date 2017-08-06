import debug from "debug";
import { NextFunction, Request, Response } from "express";
import config from "../../../../config";
import User from "../../models/user";
import { decode, JWTTokenPayload } from "../../util/jwt";

const log = debug("app:api:authorization");

export default function(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization;

  if (token) {
    if (Array.isArray(token)) {
      res.status(400);
      return res.json({
        error: "Bad Request: Invalid Authorization."
      });
    }

    log(`Found Token: ${token}`);
    return decode(token)
      .then((payload: JWTTokenPayload) => {
        return User.findOne({
          _id: payload.user._id,
          email: payload.user.email
        }).exec();
      })
      .then(user => {
        if (user) {
          if (user === null) {
            throw Error("User Not Found");
          }

          log(user);

          res.locals.user = user;
          return next();
        }
        return next();
      })
      .catch(userFindErr => {
        res.clearCookie(config.COOKIE_NAME);
        next(userFindErr);
      })
      .catch(error => {
        log(`Error for token ${token}: ${error}`);
        res.status(401);
        return res.json({
          error: "Unauthorized: Invalid Authorization"
        });
      });
  }

  res.status(401);
  return res.json({
    error: "Unauthorized: Invalid Authorization"
  });
}
