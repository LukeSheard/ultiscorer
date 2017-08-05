import { Response } from "express";
import config from "../../../../../config";

export default function(_, res: Response) {
  res.clearCookie(config.COOKIE_NAME);

  res.status(204);
  return res.json({});
}
