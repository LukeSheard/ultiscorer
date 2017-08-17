import { NextFunction, Request, Response } from "express";

export default function(_: Request, res: Response, __: NextFunction) {
  res.status(404);
  return res.json({
    error: {
      id: "404",
      message: "Route not found"
    }
  });
}
