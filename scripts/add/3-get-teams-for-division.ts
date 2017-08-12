import * as fs from "fs";
import * as path from "path";
import { FILE_PATH } from "./0-settings";

const teams = require(FILE_PATH);

console.log(
  teams.map(team => {
    return team._id;
  })
);
