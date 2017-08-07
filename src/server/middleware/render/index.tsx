import debug from "debug";
import { NextFunction, Request, Response } from "express";
import * as React from "react";
import * as ReactDOM from "react-dom/server";
import { Provider } from "react-redux";
import { match, RouterContext } from "react-router";
import { syncHistoryWithStore } from "react-router-redux";
import createRoutes from "../../../common/routes";
import HTML from "./html";

const log = debug("app:render");

export function createPage(req: Request, res: Response, renderProps): string {
  const store = res.locals.store;
  const assets = res.locals.webpackStats.toJson().assetsByChunkName;
  return ReactDOM.renderToStaticMarkup(
    <HTML assets={assets} url={req.url} store={store}>
      <Provider store={store}>
        <RouterContext {...renderProps} />
      </Provider>
    </HTML>
  );
}

export default function render(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const history = syncHistoryWithStore(res.locals.history, res.locals.store);
  const routes = createRoutes(res.locals.store);

  log("Matching route for", history.getCurrentLocation().pathname);
  match({ history, routes }, (error, redirectLocation, renderProps) => {
    if (error) {
      return next(error);
    } else if (redirectLocation) {
      /*
        Close Redux Saga Store
      */
      res.locals.store.close();

      return res
        .status(302)
        .redirect(redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      log("Rendering route for", history.getCurrentLocation().pathname);
      res.status(200);
      res.write("<!doctype HTML>");
      res.write(createPage(req, res, renderProps));

      /*
        Close Redux Saga Store
      */
      res.locals.store.close();

      /*
        End Request
      */
      return res.end();
    }

    return next("Unknown Error Occurred");
  });
}
