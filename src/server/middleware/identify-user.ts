import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import config from "../../../config";
import {
  createUserAction,
  USER_ACTION_TYPES
} from "../../common/reducers/user";
import User, { IUserModel } from "../models/user";

export default function(req: Request, res: Response, next: NextFunction) {
  const token = req.signedCookies[config.COOKIE_NAME];

  if (token) {
    return jwt.verify(
      token,
      config.COOKIE_SECRET,
      {
        algorithms: ["HS256"]
      },
      (error, payload: IUserModel) => {
        if (error) {
          res.clearCookie(config.COOKIE_NAME);
          return next(error);
        }

        return User.findOne({ _id: payload._id, email: payload.email })
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
          });
      }
    );
  }

  return next();
}
