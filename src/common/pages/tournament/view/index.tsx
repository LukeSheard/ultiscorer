export { default as prefetch } from "./saga";

import { Classes, Tag } from "@blueprintjs/core";
import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router";
import Tournament from "../../../..//models/tournament";
import { IAppState } from "../../../reducers";
const style = require("./style.css");

export interface ITournamentViewProps {
  tournament?: Tournament;
}

export class TournamentsView extends React.Component<any, any> {
  public render() {
    const { children, loading, tournament } = this.props;

    if (loading) {
      return <div>Loading</div>;
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
        <section>
          {tournament.divisions.map((division, index) =>
            <Link
              className={style.division}
              to={`/tournaments/${tournament.id}/${division.id}`}
              key={division.id}
            >
              <Tag key={index} className={Classes.LARGE}>
                {division.name}
              </Tag>
            </Link>
          )}
        </section>
        <div>
          {children}
        </div>
      </div>
    );
  }
}

export default connect((state: IAppState) => {
  const props: any = {
    loading: state.tournament.loading
  };

  const current = state.tournament.selected;
  if (current) {
    props.tournament = state.tournament.tournaments[current];
  }

  return props;
})(TournamentsView);
