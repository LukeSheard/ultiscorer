import * as React from "react";
import { reduxForm } from "redux-form";
import Select from "../form/select";

export class TournamentEdit extends React.Component<any, any> {
  public render() {
    return (
      <form>
        <Select name="select" label="Select">
          <option selected>Choose an item...</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
          <option value="4">Four</option>
        </Select>
      </form>
    );
  }
}

export const SignUpPageForm = reduxForm({
  form: "tournament"
})(TournamentEdit);

export default SignUpPageForm;
