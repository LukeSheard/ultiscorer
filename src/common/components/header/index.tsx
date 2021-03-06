import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router";
import { IAppState } from "../../reducers";
import NavLink from "./link";
import UserMenu from "./user";
const style = require("./header.css");

export function LoggedinNavbar() {
  return (
    <div className="pt-navbar-group pt-align-right">
      <NavLink
        to="/tournaments"
        iconName="timeline-events"
        text="Tournaments"
      />
      <NavLink to="/clubs" iconName="people" text="Clubs" />
      <span className="pt-navbar-divider" />
      <UserMenu />
    </div>
  );
}

export function LoggedoutNavbar() {
  return (
    <div className="pt-navbar-group pt-align-right">
      <NavLink to="/tournaments" iconName="heat-grid" text="Tournaments" />
      <span className="pt-navbar-divider" />
      <NavLink to="/sign-up" iconName="user" text="Sign Up" />
      <NavLink to="/sign-in" iconName="log-in" text="Sign In" />
    </div>
  );
}

export class Header extends React.Component<any, any> {
  public render() {
    const { loggedin } = this.props;
    return (
      <nav className="pt-navbar">
        <div className={style.navbar}>
          <div className="pt-navbar-group pt-align-left">
            <Link to="/">
              <div className="pt-navbar-heading">Ultiscorer</div>
            </Link>
          </div>
          {loggedin ? <LoggedinNavbar /> : <LoggedoutNavbar />}
        </div>
      </nav>
    );
  }
}

export function mapStateToProps(state: IAppState) {
  return {
    loggedin: state.user && state.user.token
  };
}

export default connect(mapStateToProps)(Header);
