import { NonIdealState, Tab2, Tabs2 } from "@blueprintjs/core";
import * as React from "react";
import { connect } from "react-redux";
import Loading from "../../../../components/loading";
import { IAppState } from "../../../../reducers";
const style = require("./style.css");

export { prefetch } from "./saga";

export class DivisionView extends React.Component<any, any> {
  constructor(props, ctx) {
    super(props, ctx);
    this.handleTabChange = this.handleTabChange.bind(this);
    this.state = {
      selectedTabId: 0
    };
  }

  public render() {
    const { division, loading, teams } = this.props;

    if (loading || !division) {
      return <Loading />;
    }

    return (
      <section className={style.division_page}>
        <h4>
          {division.name}
        </h4>
        {teams.length
          ? <Tabs2
              animate={false}
              onChange={this.handleTabChange}
              vertical
              id="division-teams"
              defaultSelectedTabId="all"
              selectedTabId={this.state.selectedTabId}
              key={new Date().toISOString()}
            >
              <Tab2
                id={0}
                key={0}
                title="All Teams"
                panel={<div>All Teams</div>}
              />
              {teams.map(team =>
                <Tab2
                  id={team.id}
                  key={team.id}
                  title={team.name}
                  panel={
                    <div>
                      {JSON.stringify(team)}
                    </div>
                  }
                />
              )}
            </Tabs2>
          : <NonIdealState
              title="There are no teams in this tournament"
              visual="error"
            />}
      </section>
    );
  }

  private handleTabChange(newTabId: number) {
    this.setState(() => ({
      selectedTabId: newTabId
    }));
  }
}

export function mapStateToProps(state: IAppState, { params }) {
  const props: any = {
    loading: state.team.loading
  };

  const current = state.tournament.selected;
  if (current) {
    props.division = state.tournament.tournaments[
      state.tournament.selected as string
    ].divisions.filter(d => d.id === params.division)[0];

    props.teams = props.division.teams.map(
      team => state.team.teams[team as string]
    );
  }

  return props;
}

export default connect(mapStateToProps)(DivisionView);
