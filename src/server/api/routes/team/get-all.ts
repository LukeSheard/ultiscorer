import { Request, Response } from "express";
import TeamSerializer from "../../../../models/serialize/team";
import Team from "../../../../models/team";

export default function(req: Request, res: Response) {
  const { filter = {} } = req.query;

  return Team.find(filter)
    .populate("players")
    .then(teams => {
      return res.json(TeamSerializer.serialize(teams));
    })
    .catch(error => {
      res.status(500);
      return res.json({
        error
      });
    });
}
