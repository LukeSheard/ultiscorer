import { Button, Classes, Intent } from "@blueprintjs/core";
import * as React from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import Input from "../../../components/form/input";
import {
  createTournamentAction,
  TOURNAMENT_ACTION_TYPES
} from "../../../reducers/tournament";
import saga from "./saga";

export class NewTournamentPage extends React.Component<any, any> {
  public render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <Input name="name" label="Tournament Name" required/>
        <Input name="location" label="Location" required/>
        <Button
          className={Classes.FILL}
          text="Submit"
          type="submit"
          intent={Intent.PRIMARY}
        />
      </form>
    );
  }
}

const NewTournamentPageForm = reduxForm({ form: "new-tournament" })(
  NewTournamentPage
);

export function mapStateToProps() {
  return {};
}

export function mapDispatchToProps(dispatch) {
  return {
    onSubmit: payload =>
      dispatch(
        createTournamentAction(
          TOURNAMENT_ACTION_TYPES.TOURNAMENT_CREATE_REQUEST,
          payload
        )
      )
  };
}

export const NewTournamentPageFormConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)(NewTournamentPageForm);

export default class extends React.Component<any, any> {
  public static saga = saga;

  public render() {
    return <NewTournamentPageFormConnect />;
  }
}
