import { Router } from "express";

import auth from "../../middleware/auth";

import get from "./get";
import post from "./post";

import getgames from "./relationships/games";

const router = Router();

router.use(auth);

router.get("/", get);
router.post("/", post);

router.get("/:team/games", getgames);

export default router;
