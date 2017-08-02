import { Router } from "express";

import auth from "../../middleware/auth";

import get from "./get";
import post from "./post";

const router = Router();

router.use(auth);

router.get("/", get);
router.post("/", post);

export default router;
