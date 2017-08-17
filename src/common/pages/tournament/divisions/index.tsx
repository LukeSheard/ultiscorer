import * as React from "react";
import { connect } from "react-redux";
import { IAppState } from "../../../reducers";

export class TournamentsView extends React.Component<any, any> {
  public render() {
    const { division } = this.props;
    return (
      <div>
        {division &&
          <div>
            <h4>
              {division.name}
            </h4>
            {division.teams &&
              division.teams.map(team => {
                return (
                  <p key={team}>
                    {team}
                  </p>
                );
              })}
          </div>}
      </div>
    );
  }
}

export function mapStateToProps(state: IAppState, ownProps) {
  const props: any = {
    loading: state.tournament && state.tournament.loading
  };

  const current = state.tournament && state.tournament.selected;
  if (current) {
    props.division =
      state.tournament &&
      state.tournament.tournaments[current].divisions.filter(
        d => d.id === ownProps.params.division
      )[0];
  }

  return props;
}

export default connect(mapStateToProps)(TournamentsView);
