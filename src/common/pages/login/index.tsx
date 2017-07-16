import * as React from "react";
import SignUpForm from "../../components/forms/login";
import saga from "./saga";
const style = require("./style.css");

export default class LoginPage extends React.Component<{}, any> {
  public static saga = saga;

  public render() {
    return (
      <div className={style.login_page}>
        <SignUpForm />
      </div>
    );
  }
}
