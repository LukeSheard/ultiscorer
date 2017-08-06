import { Router } from "express";

import auth from "../../middleware/auth";

import get from "./get";
import post from "./post";

import getgames from "./relationships/games";

const router = Router();

router.get("/", get);
router.get("/:team/games", getgames);

router.use(auth);
router.post("/", post);

export default router;
