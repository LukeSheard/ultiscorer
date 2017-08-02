import { NextFunction, Request, Response } from "express";

export default function(req: Request, res: Response, next: NextFunction) {
  if (!req.accepts("application/json")) {
    res.status(406);
    return res.send({
      error: "Not Acceptable"
    });
  }

  if (!req.is("application/json")) {
    res.status(415);
    return res.send({
      error: "Unsupported Media Type"
    });
  }

  res.set("Content-Type", "application/json");
  return next();
}
