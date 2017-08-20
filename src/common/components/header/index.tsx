import { Classes } from "@blueprintjs/core";
import * as cx from "classnames";
import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router";
import { IAppState } from "../../reducers";
import NavLink from "./link";
import UserMenu from "./user";
const style = require("./header.css");

export function LoggedinNavbar() {
  return (
    <div className={cx(Classes.NAVBAR_GROUP, Classes.ALIGN_RIGHT)}>
      <NavLink
        to="/tournaments"
        iconName="timeline-events"
        text="Tournaments"
      />
      <NavLink to="/clubs" iconName="people" text="Clubs" />
      <span className={cx(Classes.NAVBAR_DIVIDER)} />
      <UserMenu />
    </div>
  );
}

export function LoggedoutNavbar() {
  return (
    <div className={cx(Classes.NAVBAR_GROUP, Classes.ALIGN_RIGHT)}>
      <NavLink to="/tournaments" iconName="heat-grid" text="Tournaments" />
      <span className={Classes.NAVBAR_DIVIDER} />
      <NavLink to="/sign-up" iconName="user" text="Sign Up" />
      <NavLink to="/sign-in" iconName="log-in" text="Sign In" />
    </div>
  );
}

export class Header extends React.Component<any, any> {
  public render() {
    const { loggedin } = this.props;
    return (
      <nav className={cx(Classes.NAVBAR)}>
        <div className={style.navbar}>
          <div className={cx(Classes.NAVBAR_GROUP, Classes.ALIGN_LEFT)}>
            <Link to="/">
              <div className={Classes.NAVBAR_HEADING}>Ultiscorer</div>
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
