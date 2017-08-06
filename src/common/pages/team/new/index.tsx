import { Button, Classes, Intent } from "@blueprintjs/core";
import * as React from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import Input from "../../../components/form/input";
import { createTeamAction, TEAM_ACTION_TYPES } from "../../../reducers/team";
import saga from "./saga";

export class NewTeamPage extends React.Component<any, any> {
  public render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <Input name="name" label="Team Name" required />
        <Input name="location" label="Location" />
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

const NewTeamPageForm = reduxForm({ form: "new-team" })(NewTeamPage);

export function mapStateToProps() {
  return {};
}

export function mapDispatchToProps(dispatch) {
  return {
    onSubmit: payload =>
      dispatch(createTeamAction(TEAM_ACTION_TYPES.TEAM_CREATE_REQUEST, payload))
  };
}

export const NewTeamPageFormConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)(NewTeamPageForm);

export default class extends React.Component<any, any> {
  public static saga = saga;

  public render() {
    return <NewTeamPageFormConnect />;
  }
}
