import * as React from "react";
import saga from "./saga";

export default class SignOutPage extends React.Component<{}, {}> {
  public static saga = saga;
  public render() {
    return <div>Sign Out</div>;
  }
}
