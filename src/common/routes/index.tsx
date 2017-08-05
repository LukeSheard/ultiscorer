import * as React from "react";
import { IndexRoute, Redirect, Route } from "react-router";
import Wrap from "../components/wrap";
import { IAppStore } from "../store";
import { createConnect, createLoadModule } from "./utils";
import { userIsAuthenticated } from "./wrappers/user-authenticated";
import { userIsNotAuthenticated } from "./wrappers/user-not-authenticated";

/*
  ultiscorer.com
    /                           - What is page

    /login                      - Login Form
    /login/create-account       - Sign Up

    /games                      - View list of games and live scores
    /games/new                  - Create a new game (Private)
    /games/:gameid              - View Game Score
    /games/:gameid/edit         - Edit Game Details (Private)
    /games/:gameid/play         - Play Game with scoring (Private)

    /dashboard                  - Personal Game List / Tournaments (Private)

    /teams                      - View all teams

    /tournaments                - View tournaments
    /tournaments/new            - New Tournament
    /tournaments/:id            - View Tournament
    /tournaments/:id/edit       - View Tournament
    /tournaments/:id/:division  - View Tournament Divison
*/

export default function(store: IAppStore) {
  const connect = createConnect(store);
  const loadModule = createLoadModule(store);

  const getBlank = loadModule(() => import("./blank"));

  return (
    <Route
      path="/"
      getComponent={loadModule(() =>
        import(/* webpackChunkName: "/-container" */ "../pages/app")
      )}
    >
      <Route onEnter={connect(userIsNotAuthenticated)}>
        <IndexRoute getComponent={getBlank} />
        <Route
          path="sign-in"
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
      <Route path="tournaments" component={Wrap}>
        <Route
          path="new"
          onEnter={connect(userIsAuthenticated)}
          getComponent={loadModule(() =>
            import(/* webpackChunkName: "/tournament/new" */ "../pages/tournament/new")
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
