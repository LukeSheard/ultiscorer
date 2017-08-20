import * as React from "react";
import Header from "../components/header";
import Notifications from "../components/notifications";
export { default as saga } from "./saga";
const style = require("./style.css");

export default class AppContainer extends React.Component<any, any> {
  public render() {
    const { children } = this.props;
    return (
      <div className={style.app}>
        <Header />
        <main className={style.main_app}>
          {children}
        </main>
        <Notifications />
      </div>
    );
  }
}
