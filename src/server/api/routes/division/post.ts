import { Request, Response } from "express";
import Division from "../../../../models/division";
import Tournament from "../../../../models/tournament";

export default function(req: Request, res: Response) {
  const { gender, name, tournament, teams } = req.body;

  const division = new Division({
    gender,
    name,
    teams,
    tournament
  });

  Tournament.findById(tournament)
    .then(t => {
      if (!t) {
        throw Error("Tournament does not exist");
      }

      return division.save();
    })
    .then(() => {
      return res.json({
        data: {
          attributes: division,
          id: division._id,
          type: "Division"
        }
      });
    })
    .catch(error => {
      res.status(500);
      return res.json({
        error
      });
    });
}
