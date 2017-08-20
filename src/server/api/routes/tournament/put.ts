import { Request, Response } from "express";
import TournamentSerializer from "../../../../models/serialize/tournament";
import Tournament from "../../../../models/tournament";

export default function(req: Request, res: Response) {
  const { name, location, description, startDate, endDate } = req.body;

  return Tournament.findOne({ _id: req.params.id })
    .populate("divisions")
    .then(tournament => {
      if (!tournament) {
        throw Error("Not Found");
      }

      if (name) {
        tournament.name = name;
      }

      if (location) {
        tournament.location = location;
      }

      if (description) {
        tournament.description = description;
      }

      if (startDate) {
        tournament.startDate = startDate;
      }

      if (endDate) {
        tournament.endDate = endDate;
      }

      return tournament.save();
    })
    .then(tournament => {
      return res.json(TournamentSerializer.serialize(tournament));
    })
    .catch(error => {
      res.status(500);
      return res.json({
        error
      });
    });
}
