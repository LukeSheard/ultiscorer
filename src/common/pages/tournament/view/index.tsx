export { prefetch } from "./saga";

import { Classes, Intent, Tag } from "@blueprintjs/core";
import * as React from "react";
import { connect } from "react-redux";
import { Link, RouteComponentProps } from "react-router";
import Tournament from "../../../..//models/tournament";
import Loading from "../../../components/loading";
import { IAppState } from "../../../reducers";
const style = require("./style.css");

export interface ITournamentViewProps extends React.Props<TournamentsView> {
  loading: boolean;
  tournament?: Tournament;
}

export class TournamentsView extends React.Component<
  ITournamentViewProps & RouteComponentProps<any, any>,
  {}
> {
  public render() {
    const { children, loading, params, tournament } = this.props;

    if (loading || !tournament) {
      return <Loading />;
    }

    return (
      <div>
        <header>
          <h1>
            {tournament.name}
          </h1>
          <h2>
            {tournament.location}
          </h2>
          <p>
            {tournament.description}
          </p>
        </header>
        <section className={style.divisions}>
          {tournament.divisions.map(division =>
            <Link
              className={style.division}
              to={`/tournaments/${tournament.id}/division/${division.id}`}
              key={division.id}
            >
              <Tag
                key={division.id}
                className={Classes.LARGE}
                intent={
                  division.id === params.division ? Intent.PRIMARY : Intent.NONE
                }
              >
                {division.name}
              </Tag>
            </Link>
          )}
        </section>
        <section className={style.page}>
          {children}
        </section>
      </div>
    );
  }
}

export default connect((state: IAppState) => {
  const props: ITournamentViewProps = {
    loading: state.tournament.loading
  };

  const current = state.tournament.selected;
  if (current) {
    props.tournament = state.tournament.tournaments[current];
  }

  return props;
})(TournamentsView);
