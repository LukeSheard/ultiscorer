import debug from "debug";
import { NextFunction, Request, Response } from "express";
import config from "../../../config";
import {
  createUserAction,
  USER_ACTION_TYPES
} from "../../common/reducers/user";
import User from "../models/user";
import { decode, JWTTokenPayload } from "../util/jwt";

const log = debug("app:identifyuser");

export default function(req: Request, res: Response, next: NextFunction) {
  const token = req.signedCookies[config.COOKIE_NAME];

  if (token) {
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
          res.locals.store.dispatch(
            createUserAction(USER_ACTION_TYPES.LOGIN_SUCCESS, {
              token,
              user
            })
          );
        }
        return next();
      })
      .catch(userFindErr => {
        res.clearCookie(config.COOKIE_NAME);
        next(userFindErr);
      })
      .catch(error => {
        log(`Error for token ${token}: ${error}`);
        res.clearCookie(config.COOKIE_NAME);
        return next(error);
      });
  }

  return next();
}
