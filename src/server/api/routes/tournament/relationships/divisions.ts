import { Request, Response } from "express";
import Division from "../../../../models/division";

export default function(req: Request, res: Response) {
  return Division.find({
    tournament: req.params.tournament
  })
    .then(divisions => {
      if (!divisions) {
        throw Error("Not Found");
      }

      return res.json({
        data: divisions.map(division => ({
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
