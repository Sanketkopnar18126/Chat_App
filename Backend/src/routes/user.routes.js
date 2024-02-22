import { Router } from "express";
import { logIn, logOut, registerUser } from "../controllers/user.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";
const router = Router();

// User Route like login logout register

router.route("/register").post(
   upload.fields([
      {
         name: "profile",
         maxCount: 1,
      },
   ]),
   registerUser
);
router.route("/login").post(logIn);
router.route("/logout").post(verifyJWT, logOut);
export default router;
