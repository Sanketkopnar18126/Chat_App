import { Router } from "express";

import { verifyJWT } from "../middleware/auth.middleware.js";
import { usersData } from "../controllers/users-data.controller.js";

const router = Router();

router.route("/data").get(verifyJWT, usersData);

export default router;
