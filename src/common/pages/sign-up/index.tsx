import * as React from "react";
import SignUpForm from "../../components/forms/sign-up";
import saga from "./saga";
const style = require("./style.css");

export default class SignUpPage extends React.Component<any, any> {
  public static saga = saga;

  public render() {
    return (
      <div className={style.login_page}>
        <SignUpForm />
      </div>
    );
  }
}
