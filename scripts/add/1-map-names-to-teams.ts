import * as fs from "fs";
import * as path from "path";
import { FILE_PATH, GENDER, ObjectId } from "./0-settings";

const list = String(fs.readdirSync(FILE_PATH)).split("\n");

const teams = list.map(team => {
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
