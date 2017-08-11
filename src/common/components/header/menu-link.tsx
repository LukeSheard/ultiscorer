import { MenuItem } from "@blueprintjs/core";
import * as React from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";

export default class MenuLink extends React.Component<any, any> {
  private item: any;
  constructor(props, ctx) {
    super(props, ctx);

    this.item = connect(() => ({}), this.mapDispatchToProps.bind(this))(
      MenuItem as any
    );
  }

  public render() {
    const Component = this.item;
    const { iconName, onClick, text } = this.props;
    return <Component iconName={iconName} onClick={onClick} text={text} />;
  }

  private mapDispatchToProps(dispatch) {
    return {
      onClick: () => dispatch(push(this.props.to))
    };
  }
}
