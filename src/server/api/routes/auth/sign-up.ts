import debug from "debug";
import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import config from "../../../../../config";
import User from "../../../../models/user";

const log = debug("app:api:sign-up");

export default function(req: Request, res: Response) {
  const { email, name, password, password_confirm } = req.body;

  if (password !== password_confirm) {
    res.status(400);
    return res.send({
      error: "Passwords do not match"
    });
  }

  return User.findOne({ email })
    .then(user => {
      if (user) {
        throw Error("User already exists");
      }

      return new User({
        email,
        name,
        password
      }).save();
    })
    .then(user => {
      const userPayload = user.toObject();
      delete (userPayload as User).password;

      const payload = {
        user: userPayload
      };
      const token = jwt.sign(payload, config.COOKIE_SECRET, {
        expiresIn: "12h"
      });

      res.cookie(config.COOKIE_NAME, token, {
        httpOnly: true,
        signed: true
      });

      return res.json({
        token,
        user: userPayload
      });
    })
    .catch((error: Error) => {
      log(error);
      res.status(400);
      res.send({
        error: error.message
      });
    });
}
