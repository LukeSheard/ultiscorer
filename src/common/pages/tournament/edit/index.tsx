export { default as saga } from "./saga";

import { Button, Intent } from "@blueprintjs/core"
import * as React from "react";
import { connect } from "react-redux";
import { FieldArray } from "redux-form";
import Form from "../../../components/form";
import DateRangeInput from "../../../components/form/date-range";
import Input from "../../../components/form/input";
import Select from "../../../components/form/select";
import TextArea from "../../../components/form/textarea";
import { IAppState } from "../../../reducers";
import { TOURNAMENT_ACTION_TYPES } from "../../../reducers/tournament";

enum Genders {
  Mens = "Mens",
  Womens = "Womens",
  Open = "Open",
  Mixed = "Mixed",
  Boys = "Boys",
  Girls = "Girls"
}

const renderDivisions = ({ fields }) =>
  <div>
    <div>
      <Button type="button" intent={Intent.PRIMARY} onClick={() => fields.push({})}>
        Add Division
      </Button>
    </div>
    <hr />
    {fields.map((division, index) =>
      <div key={index}>
        <Input name={`${division}.name`} label="Division Name" required />
        <Select name={`${division}.gender`} label="Gender">
          {Object.values(Genders).map(gender =>
            <option key={gender}>
              {gender}
            </option>
          )}
        </Select>
        <hr />
      </div>
    )}
  </div>

export class NewTournamentPage extends React.Component<any, any> {
  public render() {
    const { initialValues, loading } = this.props;
    return (
      <Form
        initialValues={initialValues}
        name="new-tournament"
        loading={loading}
        action={TOURNAMENT_ACTION_TYPES.TOURNAMENT_EDIT_REQUEST}
      >
        <h1>Edit Tournament</h1>
        <Input name="name" label="Tournament Name" required />
        <Input name="location" label="Location" required />
        <TextArea name="description" label="Description" />
        <DateRangeInput name="date" label="Tournament Date" required />
        <h2>Divisions</h2>
        <FieldArray name="divisions" component={renderDivisions as any} />
      </Form>
    );
  }
}

export function mapStateToProps(state: IAppState) {
  const values =
    state.tournament.tournaments[state.tournament.selected as string];
  return {
    initialValues: {
      ...values,
      date: [values.startDate, values.endDate]
    },
    loading: state.user && state.user.loading
  };
}

export default connect(mapStateToProps)(NewTournamentPage);
