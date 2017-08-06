import { Button, Position, Tooltip } from "@blueprintjs/core";
import * as React from "react";
import { Link } from "react-router";
const style = require("./link.css");

export interface NavLinkProps {
  to: string;
  position?: Position;
  iconName?: string;
  text: string;
}

export default class NavLink extends React.Component<NavLinkProps, {}> {
  public static defaultProps = {
    position: Position.BOTTOM
  };

  public render() {
    const { iconName, position, text, to } = this.props;

    return (
      <Link to={to}>
        <Tooltip content={text} position={position}>
          <Button
            className={`${style.navlink} pt-minimal`}
            iconName={iconName}
            text={text}
          />
        </Tooltip>
      </Link>
    );
  }
}
