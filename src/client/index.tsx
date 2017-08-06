import "@blueprintjs/core/dist/blueprint.css";
import "normalize.css";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { browserHistory, match } from "react-router";
import { syncHistoryWithStore } from "react-router-redux";
import createRoutes from "../common/routes";
import createStore from "../common/store";
import App from "./app";

import * as raven from "raven-js";
raven.config(process.env.SENTRY_DSN as string).install();

const middlewares: any[] = [];

if (process.env.NODE_ENV === `development`) {
  const logger = require(`redux-logger`).default;

  middlewares.push(logger);
}

const INITIAL_STATE = JSON.parse(
  (document.getElementById("app-initial-state") as HTMLElement).innerHTML
);
const store = createStore(browserHistory, INITIAL_STATE, ...middlewares);
const history = syncHistoryWithStore(browserHistory, store);
const routes = createRoutes(store);

match({ history, routes }, (_, __, renderProps) => {
  return ReactDOM.render(
    <App store={store} {...renderProps} />,
    document.getElementById("root")
  );
});
