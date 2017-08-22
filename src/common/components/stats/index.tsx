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
          "homeTurns" : 0,
          "finished": false,
          "homeScored": false
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
                (homeTeamHasDisc) ? row.homeScored = true : row.homeScored = false;
                row.Score = homeGoals + " - " + awayGoals;
                homeTeamHasDisc = !homeTeamHasDisc;
                row.finished = true;
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
                  "homeTurns" : 0,
                  "finished": false,
                  "homeScored": false
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

    const computedData = (data) => {
      let cols = () => ({
        "home": {"O": 0, "D": 0},
        "away": {"O": 0, "D": 0}
      });

      let results = {
        "PointsPlayed": cols(),
        "GoalsScored": cols(),
        "Turnovers": cols(),
        "Blocks": cols(),
        "Breaks": cols(),
        "PointsWithTurns": cols(),
        "HadDiscPoints": cols(),
        "NoTurnGoals": cols(),
        "GoalsWithTurns": cols(),
        "ConversionRate": cols(),
        "PerfectConversionRate": cols(),
        "MeanTurnsPerPoint": cols(),
        "RecoveryRate": cols(),
        "DefensiveSuccessRate": {"home": {"O": "", "D": 0}, "away": {"O": "", "D": 0}}
      }

      data.reduce((point) => {
        if (point.homeSide === "O") {
          // home O
          results.PointsPlayed.home.O += 1;
          results.Turnovers.home.O += point.homeTurns;
          results.Blocks.home.O += point.awayTurns;
          results.HadDiscPoints.home.O += 1;
          results.PointsWithTurns.home.O += (point.homeTurns > 0) ? 1 : 0;
          // away D
          results.PointsPlayed.away.D += 1;
          results.Turnovers.away.D += point.awayTurns;
          results.Blocks.away.D += point.homeTurns;
          results.HadDiscPoints.away.D += (point.homeTurns > 0) ? 1 : 0;
          results.PointsWithTurns.away.D += (point.awayTurns > 0) ? 1 : 0;
        } else if (point.homeSide === "D") {
          // home D
          results.PointsPlayed.home.D += 1;
          results.Turnovers.home.D += point.homeTurns;
          results.Blocks.home.D += point.awayTurns;
          results.HadDiscPoints.home.D += (point.awayTurns > 0) ? 1 : 0;
          results.PointsWithTurns.home.D += (point.homeTurns > 0) ? 1 : 0;
          // away O
          results.PointsPlayed.away.O += 1;
          results.Turnovers.away.O += point.awayTurns;
          results.Blocks.away.O += point.homeTurns;
          results.HadDiscPoints.away.O += 1;
          results.PointsWithTurns.away.O += (point.homeTurns > 0) ? 1 : 0;
        }

        if (point.finshed) {
          if (point.homeScored) {
            if (point.homeSide === "O") {
              results.GoalsScored.home.O += 1;
              (point.homeTurns > 0) ? results.GoalsWithTurns.home.O += 1 : results.NoTurnGoals.home.O += 1;
            } else if (point.homeSide === "D") {
              results.GoalsScored.home.D += 1;
              results.Breaks.home.D += 1;
              results.Breaks.away.O -= 1;
              (point.homeTurns > 0) ? results.GoalsWithTurns.home.D += 1 : results.NoTurnGoals.home.D += 1;
            }
          } else {
            if (point.homeSide === "O") {
              results.GoalsScored.away.D += 1;
              results.Breaks.away.D += 1;
              results.Breaks.home.O -= 1;
              (point.awayTurns > 0) ? results.GoalsWithTurns.away.D += 1 : results.NoTurnGoals.away.D += 1;
            } else if (point.homeSide === "D") {
              results.GoalsScored.away.O += 1;
              (point.awayTurns > 0) ? results.GoalsWithTurns.away.O += 1 : results.NoTurnGoals.away.O += 1;
            }
          }
        }

        results.ConversionRate.home.O = results.GoalsScored.home.O / results.PointsPlayed.home.O;
        results.ConversionRate.home.D = results.GoalsScored.home.D / results.HadDiscPoints.home.D;
        results.ConversionRate.away.O = results.GoalsScored.away.O / results.PointsPlayed.away.O;
        results.ConversionRate.away.D = results.GoalsScored.away.D / results.HadDiscPoints.away.D;

        results.PerfectConversionRate.home.O = results.NoTurnGoals.home.O / results.PointsPlayed.home.O;
        results.PerfectConversionRate.home.D = results.NoTurnGoals.home.D / results.HadDiscPoints.home.D;
        results.PerfectConversionRate.away.O = results.NoTurnGoals.away.O / results.PointsPlayed.away.O;
        results.PerfectConversionRate.away.D = results.NoTurnGoals.away.D / results.HadDiscPoints.away.D;

        results.MeanTurnsPerPoint.home.O = results.Turnovers.home.O / results.PointsPlayed.home.O;
        results.MeanTurnsPerPoint.home.D = results.Turnovers.home.D / results.HadDiscPoints.home.D;
        results.MeanTurnsPerPoint.away.O = results.Turnovers.away.O / results.PointsPlayed.away.O;
        results.MeanTurnsPerPoint.away.D = results.Turnovers.away.D / results.HadDiscPoints.away.D;

        results.RecoveryRate.home.O = results.GoalsWithTurns.home.O / results.PointsWithTurns.home.O;
        results.RecoveryRate.home.D = results.GoalsWithTurns.home.D / results.PointsWithTurns.home.D;
        results.RecoveryRate.away.O = results.GoalsWithTurns.away.O / results.PointsWithTurns.away.O;
        results.RecoveryRate.away.D = results.GoalsWithTurns.away.D / results.PointsWithTurns.away.D;

        results.DefensiveSuccessRate.home.D = results.HadDiscPoints.home.D / results.PointsPlayed.home.D;
        results.DefensiveSuccessRate.away.D = results.HadDiscPoints.away.D / results.PointsPlayed.away.D;
      });

      return results;
    }

    const tableRows = rawData();
    const computed = computedData(tableRows);

    return (
      <div>
        <table className="pt-table pt-interactive" style={{"width": "100%"}}>
          <tbody>
            <tr>
              <th colSpan={2} style={{"textAlign": "center"}}>{game.home.name}</th>
              <th />
              <th colSpan={2} style={{"textAlign": "center"}}>{game.away.name}</th>
            </tr>
            <tr>
                <th style={{"textAlign": "center", "width": "20%"}}>Turns</th>
                <th style={{"textAlign": "center", "width": "20%"}}>O/D</th>
                <th style={{"textAlign": "center", "width": "20%"}}>Score</th>
                <th style={{"textAlign": "center", "width": "20%"}}>O/D</th>
                <th style={{"textAlign": "center", "width": "20%"}}>Turns</th>
            </tr>
            {tableRows.map((point, index) =>
              (point.length === 0) ? null :
              <tr key={index}>
                <td style={{"textAlign": "center", "width": "20%"}}>
                  {(point.Score === "HALF") ? "" : point.homeTurns}
                </td>
                <td style={{"textAlign": "center", "width": "20%"}}>
                  {point.homeSide}
                </td>
                <td style={{"textAlign": "center", "width": "20%"}}>
                  {point.Score}
                </td>
                <td style={{"textAlign": "center", "width": "20%"}}>
                  {point.awaySide}
                </td>
                <td style={{"textAlign": "center", "width": "20%"}}>
                  {(point.Score === "HALF") ? "" : point.awayTurns}
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <hr />
        <table className="pt-table pt-interactive" style={{"width": "100%"}}>
          <tbody>
            <tr>
              <th colSpan={2} style={{"textAlign": "center"}}>{game.home.name}</th>
              <th />
              <th colSpan={2} style={{"textAlign": "center"}}>{game.away.name}</th>
            </tr>
            <tr>
              <th style={{"textAlign": "center"}}>O</th>
              <th style={{"textAlign": "center"}}>D</th>
              <th />
              <th style={{"textAlign": "center"}}>O</th>
              <th style={{"textAlign": "center"}}>D</th>
            </tr>
            {Object.keys(computed).map((keyName, index) =>
              <tr key={index}>
                <td style={{"textAlign": "center", "width": "20%"}}>
                  {computed[keyName].home.O}
                </td>
                <td style={{"textAlign": "center", "width": "20%"}}>
                  {computed[keyName].home.D}
                </td>
                <td style={{"textAlign": "center", "width": "20%"}}>
                  {keyName.replace(/([A-Z])/g, ' $1').trim()}
                </td>
                <td style={{"textAlign": "center", "width": "20%"}}>
                  {computed[keyName].home.O}
                </td>
                <td style={{"textAlign": "center", "width": "20%"}}>
                  {computed[keyName].away.D}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}
