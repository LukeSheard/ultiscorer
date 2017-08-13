export { default as saga } from "./saga";

import * as React from "react";
import { connect } from "react-redux";
import Form from "../../../components/form";
import Input from "../../../components/form/input";
import { IAppState } from "../../../reducers";
import { TOURNAMENT_ACTION_TYPES } from "../../../reducers/tournament";

export class EditTournamentPage extends React.Component<any, any> {
  constructor(props, ctx) {
    super(props, ctx);
  }

  public render() {
    const { loading } = this.props;
    return (
      <Form
        // initialValues={initialValues}
        name="editTournament"
        loading={loading}
        action={TOURNAMENT_ACTION_TYPES.TOURNAMENT_UPDATE_REQUEST}
      >
        <h1>Edit Tournament</h1>
        <Input name="name" type="text" label="Name" required />
        <Input name="location" type="text" label="Location" required />
        <Input name="divisions" type="text" label="Divisions" />
        <Input name="description" type="text" label="Description" />
      </Form>
    );
  }
}

export function mapStateToProps(state: IAppState) {
  return {
    // initialValues: state.user.user,
    loading: state.user.loading
  };
}

export default connect(mapStateToProps)(EditTournamentPage);
