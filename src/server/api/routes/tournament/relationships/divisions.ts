import { Request, Response } from "express";
import Tournament from "../../../../models/tournament";

export default function(req: Request, res: Response) {
  return Tournament.findById(req.params.tournament)
    .populate("divisions")
    .then(tournament => {
      if (!tournament) {
        throw Error("Not Found");
      }

      return res.json({
        data: tournament.divisions.map(division => ({
          attributes: division,
          id: division._id,
          type: "Division"
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
