import * as React from "react";
import { IndexRedirect, IndexRoute, Route } from "react-router";
import Wrap from "../components/wrap";
import { IAppStore } from "../store";
import { createConnect, createLoadModule } from "./utils";
import { userIsAuthenticated } from "./wrappers/user-authenticated";
import { userIsNotAuthenticated } from "./wrappers/user-not-authenticated";

/*
  ultiscorer.com
    /                                     - What is page

    /login                                - Login Form
    /login/create-account                 - Sign Up

    /account                              - Account management page

    /games                                - View list of games and live scores
    /games/new                            - Create a new game (Private)
    /games/:gameid                        - View Game Score
    /games/:gameid/edit                   - Edit Game Details (Private)
    /games/:gameid/play                   - Play Game with scoring (Private)

    /teams                                - View all teams
    /teams/new                            - Create a Team

    /tournaments                          - View tournaments
    /tournaments/new                      - New Tournament
    /tournaments/:id/view                 - View Tournament
    /tournaments/:id/edit                 - View Tournament
    /tournaments/:id/divisions/:division  - View Tournament Divison
    /tournaments/:id/divisions/:division/edit  - Edit Tournament Divison
*/

export default function(store: IAppStore) {
  const connect = createConnect(store);
  const loadModule = createLoadModule(store);

  return (
    <Route
      path="/"
      getComponent={loadModule(() =>
        import(/* webpackChunkName: "/-container" */ "../app")
      )}
    >
      <IndexRoute
        getComponent={loadModule(() =>
          import(/* webpackChunkName: "/" */ "../pages/home")
        )}
      />
      <Route onEnter={connect(userIsNotAuthenticated)}>
        <Route
          path="sign-in"
          getComponent={loadModule(() =>
            import(/* webpackChunkName: "/sign-in" */ "../pages/user/sign-in")
          )}
        />
        <Route
          path="sign-up"
          getComponent={loadModule(() =>
            import(/* webpackChunkName: "/sign-up" */ "../pages/user/sign-up")
          )}
        />
      </Route>
      <Route
        path="sign-out"
        getComponent={loadModule(() =>
          import(/* webpackChunkName: "/sign-out" */ "../pages/user/sign-out")
        )}
      />
      <Route
        path="account"
        getComponent={loadModule(() =>
          import(/* webpackChunkName: "/account" */ "../pages/user/account")
        )}
      />
      <Route path="games" component={Wrap}>
        <IndexRoute
          getComponent={loadModule(() =>
            import(/* webpackChunkName: "/tournament" */ "../pages/game/view-all")
          )}
        />
        <Route
          path="new"
          getComponent={loadModule(() =>
            import(/* webpackChunkName: "/account" */ "../pages/game/new")
          )}
        />
        <Route
          path=":id"
          getComponent={loadModule(() =>
            import(/* webpackChunkName: "/account" */ "../pages/game/view")
          )}
        >
          <Route
            path="play"
            getComponent={loadModule(() =>
              import(/* webpackChunkName: "/account" */ "../pages/game/view/play")
            )}
          />
          <Route path="edit" component={() => <div>Edit the sucker</div>} />
        </Route>
      </Route>
      <Route path="tournaments" component={Wrap}>
        <IndexRoute
          getComponent={loadModule(() =>
            import(/* webpackChunkName: "/tournament" */ "../pages/tournament/view-all")
          )}
        />
        <Route
          path="new"
          onEnter={connect(userIsAuthenticated)}
          getComponent={loadModule(() =>
            import(/* webpackChunkName: "/tournament/new" */ "../pages/tournament/new")
          )}
        />
        <Route path=":id" component={Wrap}>
          <Route
            path="edit"
            getComponent={loadModule(() =>
              import(/* webpackChunkName: "/tournament/edit" */ "../pages/tournament/edit")
            )}
          />
          <IndexRoute
            getComponent={loadModule(() =>
              import(/* webpackChunkName: "/tournament/new" */ "../pages/tournament/view")
            )}
          />
          <Route
            path="division"
            getComponent={loadModule(() =>
              import(/* webpackChunkName: "/tournament/new" */ "../pages/tournament/view")
            )}
          >
            <IndexRedirect to="" />
            <Route
              path=":division"
              getComponent={loadModule(() =>
                import(/* webpackChunkName: "/tournament/division/edit" */ "../pages/tournament/view/division")
              )}
            />
          </Route>
        </Route>
      </Route>
      <Route
        path="error"
        getComponent={loadModule(() =>
          import(/* webpackChunkName: "/error" */ "../pages/error")
        )}
      />
      <Route
        path="not-found"
        getComponent={loadModule(() =>
          import(/* webpackChunkName: "/not-found" */ "../pages/not-found")
        )}
      />
    </Route>
  );
}
