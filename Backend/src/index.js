// import connectDb from "./db/index.js";
// import { app } from "./app.js";
// connectDb()
//    .then(() => {
//       app.listen(process.env.PORT || 8002, () => {
//          console.log(
//             `server start successfull....DbConnect!!!${process.env.PORT}`
//          );
//       });
//    })
//    .catch((error) => {
//       console.log("Something error occur in Index.js while connect", error);
//    });

// import express from "express";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import connectDb from "./db/index.js";
import { app } from "./app.js";

//  User

dotenv.config({ path: "./.env" });
const server = http.createServer(app);
const io = new Server(server);

connectDb()
   .then(() => {
      server.listen(process.env.PORT || 8002, () => {
         console.log(
            `Server started successfully. Database connected on port ${
               process.env.PORT || 8002
            }`
         );
      });

      // Socket.io integration
      io.on("connection", (socket) => {
         console.log("A user connected");

         // Example: Listen for a custom event 'chat message'
         socket.on("chat message", (msg) => {
            console.log("message: " + msg);
            // Broadcast the message to all connected clients
            io.emit("chat message", msg);
         });

         // Handle disconnection
         socket.on("disconnect", () => {
            console.log("User disconnected");
         });
      });
   })
   .catch((error) => {
      console.error("Error connecting to the database:", error);
   });
