import debug from "debug";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import config from "../../../../config";
import User from "../../models/user";

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

    return verify(
      token,
      config.COOKIE_SECRET,
      {
        algorithms: ["HS256"]
      },
      (error, payload: User) => {
        if (error) {
          log(error.message);
          res.status(401);
          return res.json({
            error: "Unauthorized: Invalid Authorization"
          });
        }

        return User.findOne({ _id: payload._id, email: payload.email })
          .then(user => {
            if (user === null) {
              throw Error("User Not Found");
            }

            log(user);

            res.locals.user = user;
            return next();
          })
          .catch(userFindErr => {
            log(userFindErr.message);
            res.status(401);
            return res.json({
              error: "Unauthorized: Invalid Authorization"
            });
          });
      }
    );
  }

  res.status(401);
  return res.json({
    error: "Unauthorized: Invalid Authorization"
  });
}
