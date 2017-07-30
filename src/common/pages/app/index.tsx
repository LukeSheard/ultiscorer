import * as React from "react";
import Header from "../../components/header";
import Notifications from "../../components/notifications";
const style = require("./style.css");

export default class AppContainer extends React.Component<any, any> {
  public render() {
    const { children } = this.props;
    return (
      <div>
        <Header />
        <main className={style.main_app}>
          {children}
        </main>
        <Notifications />
      </div>
    );
  }
}
