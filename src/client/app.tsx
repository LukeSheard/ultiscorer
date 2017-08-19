import * as React from "react";
import { Provider } from "react-redux";
import { Router } from "react-router";

export default class AppWrapper extends React.Component<any, any> {
  public constructor(props, ctx) {
    super(props, ctx);
    this.state = {
      error: false
    };
  }

  public componentDidCatch() {
    this.setState(() => ({ error: true }));
  }

  public render() {
    if (this.state.error) {
      return <div>Unknown exception occurred</div>;
    }

    const { store, ...renderProps } = this.props;
    return (
      <Provider store={store}>
        <Router key={new Date().toISOString()} {...renderProps} />
      </Provider>
    );
  }
}
