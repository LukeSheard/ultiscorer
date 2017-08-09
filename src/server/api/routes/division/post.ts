import { Request, Response } from "express";
import Division from "../../../models/division";
import Tournament from "../../../models/tournament";

export default function(req: Request, res: Response) {
  const { gender, name, tournament: tournamentId, teams } = req.body;

  const division = new Division({
    gender,
    name,
    teams
  });

  Tournament.findById(tournamentId)
    .then(tournament => {
      if (!tournament) {
        throw Error("Tournament does not exist");
      }
      return tournament;
    })
    .then(tournament => {
      tournament.divisions.push(division._id);

      return tournament.save();
    })
    .then(() => {
      return division.save();
    })
    .then(args => {
      console.log(args);
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
