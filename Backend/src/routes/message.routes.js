import { Router } from "express";
import { getMessage, sendMessage } from "../controllers/message.controllers.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
const router = Router();

router.route("/send_message/:id").post(verifyJWT, sendMessage);
router.route("/get_message/:id").get(verifyJWT, getMessage);

export default router;
