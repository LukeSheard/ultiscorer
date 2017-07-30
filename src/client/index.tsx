import "@blueprintjs/core/dist/blueprint.css";
import debug from "debug";
import "normalize.css";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { browserHistory, match, Router } from "react-router";
import { syncHistoryWithStore } from "react-router-redux";
import { createLogger } from "redux-logger";
import createRoutes from "../common/routes";
import createStore from "../common/store";

const logger = debug("app:client");

const INITIAL_STATE = JSON.parse(
  (document.getElementById("app-initial-state") as HTMLElement).innerHTML
);
const store = createStore(
  browserHistory,
  INITIAL_STATE,
  createLogger({
    logger
  })
);
const history = syncHistoryWithStore(browserHistory, store);
const routes = createRoutes(store);

match({ history, routes }, (_, __, renderProps) => {
  return ReactDOM.render(
    <Provider store={store}>
      <Router {...renderProps} />
    </Provider>,
    document.getElementById("root")
  );
});
