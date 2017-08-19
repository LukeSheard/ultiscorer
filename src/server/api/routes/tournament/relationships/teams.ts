import { Request, Response } from "express";
import TeamSerializer from "../../../../../models/serialize/team";
import Team from "../../../../../models/team";
import Tournament from "../../../../../models/tournament";

export default function(req: Request, res: Response) {
  return Tournament.findOne({ _id: req.params.id })
    .populate("divisions")
    .then(tournament => {
      if (!tournament) {
        throw Error("Not Found");
      }
      return Team.populate(tournament.divisions, {
        path: "teams"
      });
    })
    .then(divisions => {
      const teams = divisions.reduce((acc, division) => {
        return acc.concat((division as any).teams);
      }, [] as any[]);
      return res.json(TeamSerializer.serialize(teams));
    })
    .catch(error => {
      res.status(500);
      return res.json({
        error
      });
    });
}
