import * as React from "react";
import { Provider } from "react-redux";
import { Router } from "react-router";
import { push } from "react-router-redux";
import { IAppStore } from "../common/store";

export interface AppProps extends React.Props<AppWrapper> {
  store: IAppStore;
}

export default class AppWrapper extends React.Component<AppProps, any> {
  public constructor(props, ctx) {
    super(props, ctx);
    this.state = {
      error: false
    };
  }

  public componentDidCatch() {
    this.props.store.dispatch(push("/error"));
  }

  public render() {
    const { store, ...renderProps } = this.props;
    return (
      <Provider store={store}>
        <Router key={new Date().toISOString()} {...renderProps} />
      </Provider>
    );
  }
}
