import { Request, Response } from "express";
import Division from "../../../models/division";

export default function(req: Request, res: Response) {
    return Division.findById(req.params.id)
        .then(division => {
            if (!division){
                throw Error("Division does not exist.");
            }

            const { name, teams } = req.body;

            if (name) {
                division.name = name;
            }

            if (teams) {
                division.teams = teams;
            }

            return division.save();
        })
        .then(division => {
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
