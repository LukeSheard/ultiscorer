import * as React from "react";
import Header from "../../components/header";

export default class AppContainer extends React.Component<any, any> {
  public render() {
    const { children } = this.props;
    return (
      <div>
        <Header />
        <main>
          {children}
        </main>
      </div>
    );
  }
}
