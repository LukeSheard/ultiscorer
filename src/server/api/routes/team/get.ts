import { Request, Response } from "express";
import Team from "../../../models/team";

export default function(req: Request, res: Response) {
  const { expand = [], ...query } = req.query;

  return Team.find(query)
    .populate(expand.join(" "))
    .then(teams => {
      return res.json({
        data: teams.map(team => ({
          attributes: team,
          id: team._id,
          type: "Team"
        }))
      });
    })
    .catch(error => {
      res.status(500);
      return res.json({
        error
      });
    });
}
