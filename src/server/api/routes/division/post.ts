import { Request, Response } from "express";
import Division from "../../../models/division";
import Tournament from "../../../models/tournament";

export default function(req: Request, res: Response) {
  const { name, tournament: tournamentId, teams } = req.body;

  const division = new Division({
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
      tournament.divisions.push(division);

      return [tournament.save(), division.save()];
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
