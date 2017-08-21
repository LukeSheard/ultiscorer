import * as fs from "fs";
import * as path from "path";
import { FILE_PATH, ObjectId, TEAMS } from "../settings";

const games = require(FILE_PATH);

function findDivision(team) {
  const divisions = require(path.join(
    __dirname,
    "../../data/tour1/divisions.json"
  ));
  const division = divisions.filter(d => {
    return d.teams.map(t => t.$oid).includes(team);
  });
  return division[0];
}

const newGames = games.map(game => {
  const minPoints = Math.min(game.AwayScore, game.HomeScore);
  const turnPoints = Math.max(game.AwayScore, game.HomeScore) - minPoints;
  const division =
    findDivision(TEAMS[game.Away]._id.$oid) ||
    findDivision(TEAMS[game.Home]._id.$oid);
  const newGame = {
    _id: {
      $oid: ObjectId()
    },
    actions: Array.apply(null, Array(minPoints))
      .map(() => ({
        date: new Date(),
        type: "SCORE"
      }))
      .concat(
        Array.apply(null, Array(turnPoints)).reduce(acc => {
          return acc.concat(
            {
              date: new Date(),
              type: "TURN"
            },
            {
              date: new Date(),
              type: "SCORE"
            }
          );
        }, [])
      ),
    away: TEAMS[game.Away]._id,
    division: division._id,
    firstPull: TEAMS[game.Home]._id,
    home: TEAMS[game.Home]._id,
    owner: {
      $oid: "598f07679a5d6fdee4ae8bcd"
    },
    tournament: division.tournament
  };
  return newGame;
});

fs.writeFileSync(FILE_PATH, JSON.stringify(newGames, null, 2));
