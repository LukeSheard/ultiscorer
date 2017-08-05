import { Button, Position, Tooltip } from "@blueprintjs/core";
import * as React from "react";
import { Link } from "react-router";

export interface NavLinkProps {
  to: string;
  position?: Position;
  iconName?: string;
  text: string;
  onClick?: () => any;
}

export default class NavLink extends React.Component<NavLinkProps, {}> {
  public static defaultProps = {
    position: Position.BOTTOM
  };

  public render() {
    const { iconName, onClick, position, text, to } = this.props;

    return (
      <Link to={to} onClick={onClick}>
        <Tooltip content={text} position={position}>
          <Button className="pt-minimal" iconName={iconName} text={text} />
        </Tooltip>
      </Link>
    );
  }
}
