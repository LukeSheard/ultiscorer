import * as React from "react";
import saga from "./saga";

export default class DashboardPage extends React.Component<any, any> {
  public static saga = saga;

  public render() {
    const { children } = this.props;
    return (
      <div>
        {children}
      </div>
    );
  }
}
