import debug from "debug";
import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import config from "../../../../../config";
import User from "../../../models/user";

const log = debug("app:api:sign-in");

export default function(req: Request, res: Response) {
  const { email, password } = req.body;

  return User.findOne({ email })
    .select("+password")
    .then(user => {
      if (!user) {
        throw Error("User Not Found");
      }
      return user.comparePassword(password);
    })
    .then(user => {
      const payload = {
        _id: user._id,
        email: user.email,
        name: user.name
      };
      const token = jwt.sign(payload, config.COOKIE_SECRET, {
        expiresIn: "12h"
      });

      res.cookie(config.COOKIE_NAME, token, {
        httpOnly: true,
        signed: true
      });

      return res.json({
        token
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
