import * as React from "react";

export default class Wrap extends React.Component<{}, {}> {
  public render() {
    return this.props.children as any;
  }
}
