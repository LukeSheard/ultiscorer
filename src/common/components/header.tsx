import { Button, Position, Tooltip } from "@blueprintjs/core";
import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router";
import { IAppState } from "../reducers";
import { createUserAction, USER_ACTION_TYPES } from "../reducers/user";

export function LoggedinNavbar({ logout }) {
  return (
    <div className="pt-navbar-group pt-align-right">
      <Button className="pt-minimal" iconName="plus" text="New Game" />
      <span className="pt-navbar-divider" />
      <Tooltip content="Account" position={Position.LEFT}>
        <Button className="pt-minimal" iconName="user" />
      </Tooltip>
      <Tooltip content="Logout" position={Position.LEFT}>
        <Button className="pt-minimal" iconName="log-out" onClick={logout} />
      </Tooltip>
    </div>
  );
}

export function LoggedoutNavbar() {
  return (
    <div className="pt-navbar-group pt-align-right">
      <Link to="/sign-up">
        <Button className="pt-minimal" iconName="user" text="Sign Up" />
      </Link>
      <Link to="/login">
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
