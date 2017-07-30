import { Router } from "express";

import signin from "./sign-in";
import signout from "./sign-out";
import signup from "./sign-up";

const router = Router();

router.post("/sign-in", signin);
router.post("/sign-out", signout);
router.post("/sign-up", signup);

export default router;
