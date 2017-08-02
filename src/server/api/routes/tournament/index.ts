import { Router } from "express";

import auth from "../../middleware/auth";

import get from "./get";
import post from "./post";

const router = Router();

router.get("/", auth, get);
router.post("/", auth, post);

export default router;
