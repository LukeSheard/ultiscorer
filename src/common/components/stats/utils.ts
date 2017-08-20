import { POINT_ACTIONS } from "./../../reducers/game";

export function mapActionsToRows(actions) {
  let point = 0;
  return actions.reduce(
    (acc, action) => {
      switch (action.type) {
        case POINT_ACTIONS.HALF: {
          acc[point].push(action);
          point += 1;
          acc.push([]);
          break;
        }
        case POINT_ACTIONS.TURN: {
          acc[point].push(action);
          break;
        }
        case POINT_ACTIONS.SCORE: {
          acc[point].push(action);
          point += 1;
          acc.push([]);
          break;
        }
        default: {
          return acc;
        }
      }
      return acc;
    },
    [[]]
  );
}
