import { Router } from "express";
import { sendMessage } from "../controllers/message.controllers.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
const router = Router();

router.route("/send_message/:id").post(verifyJWT, sendMessage);

export default router;
