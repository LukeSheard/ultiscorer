import { Classes, Intent, Spinner } from "@blueprintjs/core";
import * as React from "react";

export interface LoadingProps extends React.Props<Loading> {
  wait?: number;
}

export interface LoadingState {
  display: boolean;
}

/**
 * Loading
 * A utility component for displaying a spinner if the loading
 * screen is not cleared in 500ms (but assignable) which is what
 * I deem to be an acceptable AJAX waiting time
 *
 *
 * @export
 * @class Loading
 * @extends {React.Component<{}, LoadingState>}
 */
export default class Loading extends React.Component<
  LoadingProps,
  LoadingState
> {
  public static defaultProps: LoadingProps = {
    wait: 500
  };

  private timeout: NodeJS.Timer | number;

  constructor(props, ctx) {
    super(props, ctx);
    this.state = {
      display: false
    };
  }

  public componentDidMount() {
    this.timeout = setTimeout(() => {
      this.setState(() => ({
        display: true
      }));
    }, this.props.wait);
  }

  public componentWillUnmount() {
    clearTimeout(this.timeout as NodeJS.Timer);
  }

  public render() {
    if (!this.state.display) {
      return null;
    }

    return (
      <div>
        <Spinner className={Classes.LARGE} intent={Intent.PRIMARY} />
        <h2>Loading</h2>
      </div>
    );
  }
}
