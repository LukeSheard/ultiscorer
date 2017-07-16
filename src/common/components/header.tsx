import * as React from "react";

export default class Header extends React.Component<any, any> {
  public render() {
    const { loggedIn } = this.props;
    return (
      <nav>
        {loggedIn ? <button>Log Out</button> : null}
      </nav>
    );
  }
}
