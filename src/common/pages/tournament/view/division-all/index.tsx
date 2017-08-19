import * as React from "react";
import { connect } from "react-redux";
import { IAppState } from "../../../../reducers";
import { DivisionView } from "../division";

export { prefetch } from "./saga";

export function mapStateToProps(state: IAppState) {
  const props: any = {
    loading: state.team.loading
  };

  const current = state.tournament.selected;
  if (current) {
    props.division = {
      name: "All Teams"
    };

    const teams = state.tournament.tournaments[
      state.tournament.selected as string
    ].divisions.reduce((acc, division) => {
      return acc.concat(division.teams);
    }, [] as any[]);

    props.teams = teams.map(id => {
      const team = state.team.teams[id as string];
      return {
        ...team,
        name: (
          <span>
            {team.name} ({team.gender})
          </span>
        )
      };
    });
  }

  return props;
}

export default connect(mapStateToProps)(DivisionView);
