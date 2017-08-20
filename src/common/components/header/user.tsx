import {
  Button,
  Menu,
  MenuDivider,
  Popover,
  Position
} from "@blueprintjs/core";
import * as React from "react";
import MenuLink from "./menu-link";

export default class UserMenu extends React.Component<{}, {}> {
  public render() {
    return (
      <Popover
        content={this.renderMenu()}
        position={Position.BOTTOM_RIGHT}
        target={<Button iconName="person" className="pt-minimal" />}
      />
    );
  }

  private renderMenu() {
    return (
      <Menu>
        <MenuDivider title="Tournaments" />
        <MenuLink
          to="/account/tournaments"
          iconName="grid-view"
          text="My Tournaments"
        />
        <MenuLink
          to="/tournaments/new"
          iconName="new-grid-item"
          text="New Tournament"
        />
        <MenuDivider title="Teams" />
        <MenuLink to="/account/teams" iconName="people" text="My Teams" />
        <MenuLink to="/teams/new" iconName="new-person" text="New Team" />
        <MenuDivider title="Account" />
        <MenuLink to="/account" text="Account" iconName="cog" />
        <MenuLink to="/sign-out" text="Sign Out" iconName="log-out" />
      </Menu>
    );
  }
}
