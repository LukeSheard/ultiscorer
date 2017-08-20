export { prefetch, saga } from "./saga";

import * as React from "react";
import { connect } from "react-redux";
import { formValueSelector } from "redux-form";
import Form from "../../../components/form";
import Select from "../../../components/form/select";
import Loading from "../../../components/loading";
import { IAppState } from "../../../reducers";

export class NewGameTeamSelection extends React.Component<any, any> {
  public static defaultProps = {
    filter: () => true,
    teams: []
  };

  public render() {
    const { disabled, filter, label, name, teams } = this.props;
    return (
      <Select name={name} label={label} disabled={disabled}>
        {teams.filter(filter).map(team =>
          <option key={team.id} value={team.id}>
            {team.name}
          </option>
        )}
      </Select>
    );
  }
}

export class NewGamePage extends React.Component<any, any> {
  public render() {
    const {
      loading,
      divisions,
      gameTeams,
      home,
      teamLoading,
      teams,
      tournaments
    } = this.props;

    if (loading) {
      return <Loading />;
    }

    return (
      <Form name="new-game" action={"LOL"}>
        <h1>Create Game</h1>
        <Select name="tournament" label="Tournament">
          {tournaments.map(tournament =>
            <option key={tournament.id} value={tournament.id}>
              {tournament.name}
            </option>
          )}
        </Select>
        <Select name="division" label="Division" disabled={!divisions}>
          {divisions &&
            divisions.map(division =>
              <option key={division.id} value={division.id}>
                {division.name}
              </option>
            )}
        </Select>
        <NewGameTeamSelection
          name="home"
          label="Home"
          disabled={teamLoading || !teams}
          teams={teams}
        />
        <NewGameTeamSelection
          name="away"
          label="Away"
          disabled={teamLoading || !teams || !home}
          teams={teams}
          filter={t => t && t.id !== home}
        />
        <Select name="firstPull" label="First Pull" disabled={!gameTeams}>
          {gameTeams &&
            gameTeams.map(team =>
              <option key={team.id} value={team.id}>
                {team.name}
              </option>
            )}
        </Select>
      </Form>
    );
  }
}

const valuesSelector = formValueSelector("new-game");

export function mapStateToProps(state: IAppState) {
  const tournaments = Object.values(state.tournament.tournaments);
  const values = valuesSelector(state, "tournament", "division");

  const props: any = {
    loading: state.tournament.loading,
    teamLoading: state.team.loading,
    tournaments
  };

  if (values.tournament) {
    props.divisions = state.tournament.tournaments[values.tournament].divisions;
  }

  if (values.division && !state.team.loading) {
    const division = state.tournament.tournaments[
      values.tournament
    ].divisions.filter(d => d.id === values.division)[0];
    if (division && division.teams) {
      props.teams = division.teams
        .map(team => state.team.teams[team as any])
        .filter(t => t && t.id);
    }
  }

  const { home, away } = valuesSelector(state, "home", "away");
  props.home = home;

  if (home && away && home !== away) {
    props.gameTeams = [state.team.teams[home], state.team.teams[away]];
  }

  return props;
}

export default connect(mapStateToProps)(NewGamePage);
