import { FILE_PATH } from "../settings";

const teams = require(FILE_PATH);

console.log(
  teams.map(team => {
    return team._id;
  })
);
