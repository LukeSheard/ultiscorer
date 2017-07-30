import * as React from "react";
import { IndexRedirect, IndexRoute, Redirect, Route } from "react-router";
import Wrap from "../components/wrap";
import { IAppStore } from "../store";
import { createConnect, createLoadModule } from "./utils";
import { userIsAuthenticated } from "./wrappers/user-authenticated";
import { userIsNotAuthenticated } from "./wrappers/user-not-authenticated";

/*
  ultiscorer.com
    /                     - What is page

    /login                - Login Form
    /login/create-account - Sign Up
    /login/forgotten      - Forgotten Password

    /dashboard            - Personal Game List (Private)
    /dashboard/account    - Edit Account Page
    /dashboard/teams      - View a list of your teams
    /dashboard/teams/:id  - Edit a team

    /games                - View list of games and live scores
    /games/new            - Create a new game (Private)
    /games/:gameid        - View Game Score (Public)
    /games/:gameid/edit   - Edit Game Details (Private)
    /games/:gameid/play   - Play Game with scoring (Private)
*/

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
      <Route path="game" component={Wrap}>
        <Route
          path="new"
          getComponent={loadModule(() =>
            import(/* webpackChunkName: "dashboard-container" */ "../pages/games/new")
          )}
        />
        <Route
          path=":gameid"
          getComponent={loadModule(() =>
            import(/* webpackChunkName: "dashboard-container" */ "../pages/games")
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
      </Route>
      <Route
        path="not-found"
        getComponent={loadModule(() =>
          import(/* webpackChunkName: "/not-found" */ "../pages/not-found")
        )}
      />
      <Redirect from="*" to="/not-found" />
    </Route>
  );
}
