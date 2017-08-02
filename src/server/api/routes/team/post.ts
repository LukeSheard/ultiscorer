import { Request, Response } from "express";
import Team from "../../../models/team";
import User from "../../../models/user";

export default function(req: Request, res: Response) {
  const { name, location } = req.body;
  const { user } = res.locals;

  const document = new Team({
    location,
    name,
    owner: (user as User).id
  });

  return document
    .save()
    .then(team => {
      return res.json({
        data: {
          attributes: team,
          id: team._id,
          type: "Team"
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
