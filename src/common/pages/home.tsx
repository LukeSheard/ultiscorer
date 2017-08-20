import { Button, Intent } from "@blueprintjs/core"
import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router";
import { IAppState } from "../reducers";

export function LoggedinBody() {
  return (
    <div>
      <p>Use the links in the nav bar above.</p>
    </div>
  )
}

export function LoggedoutBody() {
  return (
    <div>
      <p>Sign-in or sign-up using the buttons below!</p>
      <div
      style={{
        textAlign: "center"
      }}
      >
        <Link to="sign-in">
          <Button
            style={{
              width: "50%"
            }}
            intent={Intent.SUCCESS}
            text="Sign-in"
          />
        </Link>
        <br/>
        <br/>
        <Link to="sign-up">
          <Button
            style={{
              width: "50%"
            }}
            intent={Intent.PRIMARY}
            text="Sign-up"
          />
        </Link>
      </div>
    </div>
  )
}

export class HomePage extends React.Component<any, any> {
  public render() {
    const { loggedin } = this.props;
    return (
      <div>
        <h1>Welcome To Ultiscorer</h1>
        {loggedin ? <LoggedinBody /> : <LoggedoutBody />}
      </div>
    )
  }
}

export function mapStateToProps(state: IAppState) {
  return {
    loggedin: state.user && state.user.token
  };
}

export default connect(mapStateToProps)(HomePage);
