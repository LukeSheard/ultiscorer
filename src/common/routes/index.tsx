import * as React from "react";
import { IndexRedirect, IndexRoute, Route } from "react-router";
import { IAppStore } from "../store";
import { createConnect, createLoadModule } from "./utils";
import { userIsAuthenticated } from "./wrappers/user-authenticated";
import { userIsNotAuthenticated } from "./wrappers/user-not-authenticated";

export default function(store: IAppStore) {
  const connect = createConnect(store);
  const loadModule = createLoadModule(store);

  return (
    <Route
      path="/"
      getComponent={loadModule(() =>
        import(/* webpackChunkName: "/-container" */ "../pages/app")
      )}
    >
      <Route onEnter={connect(userIsNotAuthenticated)}>
        <IndexRedirect to="login" />
        <Route
          path="login"
          getComponent={loadModule(() =>
            import(/* webpackChunkName: "/login" */ "../pages/login")
          )}
        />
        <Route
          path="sign-up"
          getComponent={loadModule(() =>
            import(/* webpackChunkName: "/sign-up" */ "../pages/sign-up")
          )}
        />
      </Route>
      <Route
        path="dashboard"
        getComponent={loadModule(() =>
          import(/* webpackChunkName: "dashboard-container" */ "../pages/dashboard/container")
        )}
        onEnter={connect(userIsAuthenticated)}
      >
        <IndexRoute
          getComponent={loadModule(() =>
            import(/* webpackChunkName: "dashboard" */ "../pages/dashboard")
          )}
        />
        <Route
          path=":game"
          getComponent={loadModule(() =>
            import(/* webpackChunkName: "game" */ "../pages/game")
          )}
        />
      </Route>
      <Route
        path="not-found"
        getComponent={loadModule(() =>
          import(/* webpackChunkName: "/not-found" */ "../pages/not-found")
        )}
      />
    </Route>
  );
}
