import * as fs from "fs";
import * as path from "path";

const teams = require(`./data/tour1/teams-women.json`);

console.log(teams.map(t => t._id));
