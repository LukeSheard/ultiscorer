import { Response } from "express";
import config from "../../../../../config";

export default function(_, res: Response) {
  res.clearCookie(config.COOKIE_NAME);

  res.status(200);
  return res.json({
    data: {
      attributes: {
        message: "Sign Out Successful"
      },
      id: 1,
      type: "Message"
    }
  });
}
