import * as React from "react";

import { mapActionsToRows } from "./utils";

export default class GameStats extends React.Component<any, any> {
  public render() {
    const { game } = this.props;

    const points = mapActionsToRows(game.actions);

    return (
      <table className="pt-table pt-interactive">
        <tbody>
          {points.map((point, index) =>
            <tr key={index}>
              <td>
                {JSON.stringify(point)}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }
}
