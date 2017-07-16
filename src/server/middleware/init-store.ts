import { NextFunction, Request, Response } from "express";
import { createMemoryHistory } from "react-router";
import createStore from "../../common/store";

export default function(req: Request, res: Response, next: NextFunction) {
  res.locals.history = createMemoryHistory({
    entries: [req.url]
  });
  res.locals.store = createStore(res.locals.history);

  return next();
}
