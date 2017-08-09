import { Button, Intent } from "@blueprintjs/core"
import * as React from "react";
import { Link } from "react-router";

export default class NotFoundPage extends React.Component<any, any> {
  public render() {
    return (
        <div>
            <h1>Welcome To Ultiscorer</h1>
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
                        minWidth: "50%"
                    }}
                    intent={Intent.PRIMARY}
                    text="Sign-up"
                  />
                </Link>
            </div>
        </div>
    )
  }
}
