import * as fs from "fs";
import { FILE_PATH, GENDER, ObjectId, TEAMS } from "../settings";

const list = String(fs.readFileSync(FILE_PATH)).split("\n");

const teams = list.map(team => {
  if (TEAMS[team]) {
    return TEAMS[team];
  }

  return {
    _id: {
      $oid: ObjectId()
    },
    club: team,
    gender: GENDER,
    name: team
  };
});

fs.writeFileSync(FILE_PATH, JSON.stringify(teams, null, 2));
