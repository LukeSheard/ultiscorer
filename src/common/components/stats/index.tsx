import * as React from "react";

import { mapActionsToRows } from "./utils";

export default class GameStats extends React.Component<any, any> {
  public render() {
    const { game } = this.props;

    const points = mapActionsToRows(game.actions);

    const rawData = () => {
      let firstHalf = true;
      let homeTeamHasDisc = (game.firstPull === game.away.id) ? true : false;
      let homeGoals = 0;
      let awayGoals = 0;

      return points.map((point) => {
        let row = {
          "Score" : homeGoals + " - " + awayGoals,
          "awaySide" : (homeTeamHasDisc) ? "D" : "O",
          "awayTurns" : 0,
          "homeSide" : (homeTeamHasDisc) ? "O" : "D",
          "homeTurns" : 0
        }

        if (point[0]) {
          for (const i of point) {
            switch (i.action) {
              case "TURN": {
                (homeTeamHasDisc) ? row.homeTurns += 1 : row.awayTurns += 1;
                homeTeamHasDisc = !homeTeamHasDisc;
                break;
              }
              case "SCORE": {
                (homeTeamHasDisc) ? homeGoals += 1 : awayGoals += 1;
                row.Score = homeGoals + " - " + awayGoals;
                homeTeamHasDisc = !homeTeamHasDisc;
                break;
              }
              case "HALF": {
                firstHalf = false;
                homeTeamHasDisc = (game.firstPull === game.home.id) ? true : false;
                row = {
                  "Score" : "HALF",
                  "awaySide" : "",
                  "awayTurns" : 0,
                  "homeSide" : "",
                  "homeTurns" : 0
                }
                break;
              }
            }
          }

          return row;
        } else {
          return {};
        }
      });
    }

    const tableRow = rawData();

    return (
      <table className="pt-table pt-interactive" style={{"width": "100%"}}>
        <tbody>
          <tr>
            <th colSpan={2} style={{"textAlign": "center"}}>{game.home.name}</th>
            <th />
            <th colSpan={2} style={{"textAlign": "center"}}>{game.away.name}</th>
          </tr>
          <tr>
              <th style={{"textAlign": "center"}}>Turns</th>
              <th style={{"textAlign": "center"}}>O/D</th>
              <th style={{"textAlign": "center"}}>Score</th>
              <th style={{"textAlign": "center"}}>O/D</th>
              <th style={{"textAlign": "center"}}>Turns</th>
          </tr>
          {tableRow.map((point, index) =>
            (point.length === 0) ? null :
            <tr key={index}>
              <td style={{"textAlign": "center"}}>
                {(point.Score === "HALF") ? "" : point.homeTurns}
              </td>
              <td style={{"textAlign": "center"}}>
                {point.homeSide}
              </td>
              <td style={{"textAlign": "center"}}>
                {point.Score}
              </td>
              <td style={{"textAlign": "center"}}>
                {point.awaySide}
              </td>
              <td style={{"textAlign": "center"}}>
                {(point.Score === "HALF") ? "" : point.awayTurns}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }
}
