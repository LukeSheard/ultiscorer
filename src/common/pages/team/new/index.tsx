export { default as saga } from "./saga";

import * as React from "react";
import { connect } from "react-redux";
import Form from "../../../components/form";
import Input from "../../../components/form/input";
import { IAppState } from "../../../reducers";
import { TEAM_ACTION_TYPES } from "../../../reducers/team";

export class NewTeamPage extends React.Component<any, any> {
  public render() {
    const { loading } = this.props;
    return (
      <Form
        name="new-tournament"
        loading={loading}
        action={TEAM_ACTION_TYPES.TEAM_CREATE_REQUEST}
      >
        <h1>Create Team</h1>
        <Input name="name" label="Team Name" required />
        <Input name="location" label="Location" />
      </Form>
    );
  }
}

export function mapStateToProps(state: IAppState) {
  return {
    loading: state.team.loading
  };
}

export default connect(mapStateToProps)(NewTeamPage);
