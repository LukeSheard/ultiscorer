import { Request, Response } from "express";
import TeamSerializer from "../../../../models/serialize/team";
import Team from "../../../../models/team";

export default function(req: Request, res: Response) {
  const { name, gender } = req.body;
  const { user } = res.locals;

  return new Team({
    gender,
    name,
    owner: user
  })
    .save()
    .then(team => {
      return res.json(TeamSerializer.serialize(team));
    })
    .catch(error => {
      res.status(500);
      return res.json({
        error
      });
    });
}
