import { Request, Response } from "express";
import Division from "../../../../models/division";

export default function(req: Request, res: Response) {
  return Division.findById(req.params.division)
    .populate("teams")
    .then(division => {
      if (!division) {
        throw Error("Division not found");
      }

      const teams = division.teams;
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
