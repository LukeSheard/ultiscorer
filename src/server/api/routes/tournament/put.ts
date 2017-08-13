import { Request, Response } from "express";
import Tournament from "../../../models/tournament";

export default function(req: Request, res: Response) {
    return Tournament.findById(req.params.id)
        .then(tournament => {
            if (!tournament){
                throw Error("Tournament does not exist.");
            }

            const { name, location, divisions, description } = req.body;

            if (name) {
                tournament.name = name;
            }

            if (location) {
                tournament.location = location;
            }

            if (divisions) {
                tournament.divisions = divisions;
            }

            if (description) {
                tournament.description = description;
            }

            return tournament.save();
        })
        .then(tournament => {
            return res.json({
                data: {
                    attributes: tournament,
                    id: tournament._id,
                    type: "Tournament"
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
