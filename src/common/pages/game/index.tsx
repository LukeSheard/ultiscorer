import * as React from "react";

export default class GamePage extends React.Component<any, any> {
  public render() {
    return (
      <div>
        {JSON.stringify(this.props, null, 4)}
      </div>
    );
  }
}
