import { Request, Response } from "express";
import TeamSerializer from "../../../../models/serialize/team";
import Team from "../../../../models/team";

export default function(req: Request, res: Response) {
  return Team.findOne({ _id: req.params.id })
    .populate("players")
    .then(team => {
      if (!team) {
        throw Error("Not Found");
      }
      return res.json(TeamSerializer.serialize(team));
    })
    .catch(error => {
      res.status(500);
      return res.json({
        error
      });
    });
}
