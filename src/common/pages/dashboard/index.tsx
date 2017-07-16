import * as React from "react";
import UserIsAuthenticated from "../../routes/wrappers/user-authenticated";

export class DashboardPage extends React.Component<any, any> {
  public render() {
    return <div>Dashboard</div>;
  }
}

export const x = UserIsAuthenticated(DashboardPage);

export default DashboardPage;
