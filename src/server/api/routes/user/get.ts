import { Request, Response } from "express";
import User from "../../../models/user";

export default function(req: Request, res: Response) {
  const { expand = [], ...query } = req.query;

  return User.find(query)
    .then(users => {
      return res.json({
        data: users.map(user => ({
          attributes: user,
          id: user._id,
          type: "User"
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
