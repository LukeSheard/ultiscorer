import { Request, Response } from "express";
import User from "../../../models/user";

export default function(req: Request, res: Response) {
  return User.findById(req.params.id)
    .then(user => {
      if (!user) {
        throw Error("User doesnt exist");
      }

      const { name, password_confirm, password, ukuusername } = req.body;

      if (name) {
        user.name = name;
      }

      if (ukuusername) {
        user.ukuusername = ukuusername;
      }

      if (password && password === password_confirm) {
        user.password = password;
      }

      return user.save();
    })
    .then(user => {
      return res.json({
        data: {
          attributes: user,
          id: user._id,
          type: "User"
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
