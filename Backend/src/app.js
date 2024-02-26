import express, { urlencoded } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
const app = express();

const __dirname = path.resolve();

app.use(
   cors({
      origin: process.env.CORS_ORIGIN,
      credentials: true,
   })
);

/*
**
 * json data limit set
 *  use for url encoded
 * store any data in server
 * for get cookie prform some crud operation and read only in server
 *
 * 
 
 */

app.use(express.json({ limit: "16kb" }));
app.use(urlencoded({ limit: "16kb", extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

import userRouter from "./routes/user.routes.js";
import messageRouter from "./routes/message.routes.js";
import usersRouter from "./routes/users-data.routes.js";
// auth routes
app.use("/api/v1/users", userRouter);
// Messge routes
app.use("/api/v1/users/send", messageRouter);
app.use("/api/v1/users/get", messageRouter);

//  All Users from our app
app.use("/api/v1/users/all_users", usersRouter);

//  deploy

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
   res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

export { app };
