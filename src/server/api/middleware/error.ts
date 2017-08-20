import debug from "debug";
import { NextFunction, Request, Response } from "express";
import { __DEV__ } from "../../../../config";

const log = debug("app:api:error");

export default function(
  error: Error,
  _: Request,
  res: Response,
  __: NextFunction
) {
  log(error);
  res.status(500);
  return res.json({
    error: __DEV__ ? error : "Unknown Error occurred"
  });
}
