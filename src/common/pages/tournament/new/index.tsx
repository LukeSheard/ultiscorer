export { default as saga } from "./saga";

import * as React from "react";
import { connect } from "react-redux";
import Form from "../../../components/form";
import DateRangeInput from "../../../components/form/date-range";
import Input from "../../../components/form/input";
import TextArea from "../../../components/form/textarea";
import { IAppState } from "../../../reducers";
import { TOURNAMENT_ACTION_TYPES } from "../../../reducers/tournament";

export class NewTournamentPage extends React.Component<any, any> {
  public render() {
    const { loading } = this.props;
    return (
      <Form
        name="new-tournament"
        loading={loading}
        action={TOURNAMENT_ACTION_TYPES.TOURNAMENT_CREATE_REQUEST}
      >
        <h1>Create Tournament</h1>
        <Input name="name" label="Tournament Name" required />
        <Input name="location" label="Location" required />
        <TextArea name="description" label="Description" />
        <DateRangeInput name="date" label="Tournament Date" required />
      </Form>
    );
  }
}

export function mapStateToProps(state: IAppState) {
  return {
    loading: state.user && state.user.loading
  };
}

export default connect(mapStateToProps)(NewTournamentPage);
