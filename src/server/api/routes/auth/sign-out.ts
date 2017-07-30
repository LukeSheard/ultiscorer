import { Response } from "express";
import config from "../../../../../config";

export default function(_, res: Response) {
  res.clearCookie(config.COOKIE_NAME);

  res.cookie(config.COOKIE_NAME, "", {
    expires: new Date(),
    httpOnly: true,
    signed: true
  });

  return res.json({});
}
