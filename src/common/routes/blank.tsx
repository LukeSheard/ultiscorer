import * as React from "react";

export default class BlankRoute extends React.Component<any, {}> {
  public render() {
    return (
      <div>
        <span>
          {JSON.stringify(this.props, null, 4)}
        </span>
        <div>
          {this.props.children}
        </div>
      </div>
    );
  }
}
