import { Button } from "@blueprintjs/core";
import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router";
import { IAppState } from "../../reducers";
import { createUserAction, USER_ACTION_TYPES } from "../../reducers/user";
import NavLink from "./link";

export function LoggedinNavbar({ logout }) {
  return (
    <div className="pt-navbar-group pt-align-right">
      <NavLink to="/game/new" iconName="plus" text="New Game" />
      <NavLink to="/dashboard/teams" iconName="people" text="My Teams" />
      <NavLink to="/tournaments" iconName="comparison" text="Tournaments" />
      <span className="pt-navbar-divider" />
      <NavLink to="/dashboard/account" iconName="user" text="Account" />
      <NavLink
        to="/logout"
        iconName="log-out"
        text="Log Out"
        onClick={logout}
      />
    </div>
  );
}

export function LoggedoutNavbar() {
  return (
    <div className="pt-navbar-group pt-align-right">
      <Link to="/sign-up">
        <Button className="pt-minimal" iconName="user" text="Sign Up" />
      </Link>
      <Link to="/sign-in">
        <Button className="pt-minimal" iconName="log-in" text="Log In" />
      </Link>
    </div>
  );
}

export class Header extends React.Component<any, any> {
  public render() {
    const { loggedin, logout } = this.props;
    return (
      <nav className="pt-navbar">
        <div className="pt-navbar-group pt-align-left">
          <Link to="/">
            <div className="pt-navbar-heading">Ultiscorer</div>
          </Link>
        </div>
        {loggedin ? <LoggedinNavbar logout={logout} /> : <LoggedoutNavbar />}
      </nav>
    );
  }
}

export function mapStateToProps(state: IAppState) {
  return {
    loggedin: state.user && state.user.token
  };
}

export function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(createUserAction(USER_ACTION_TYPES.SIGNOUT_REQUEST))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
