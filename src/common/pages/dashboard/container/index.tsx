import * as React from "react";

export default class DashboardPage extends React.Component<any, any> {
  public render() {
    const { children } = this.props;
    return (
      <div>
        {children}
      </div>
    );
  }
}
