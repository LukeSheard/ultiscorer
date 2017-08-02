import { Request, Response } from "express";
import Division from "../../../models/division";

export default function(req: Request, res: Response) {
  const { expand = [], ...query } = req.query;

  return Division.find(query)
    .populate(expand.join(" "))
    .then(divisions => {
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
