import { Router } from "express";

import auth from "../../middleware/auth";

import get from "./get";
import post from "./post";

const router = Router();

router.get("/", get);
router.get("/:division/relationships/team", get);

router.use(auth);
router.post("/", post);

export default router;
