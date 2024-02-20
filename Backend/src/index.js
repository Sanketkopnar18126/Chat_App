import connectDb from "./db/index.js";
import { app } from "./app.js";
connectDb()
   .then(() => {
      app.listen(process.env.PORT || 8002, () => {
         console.log(
            `server start successfull....DbConnect!!!${process.env.PORT}`
         );
      });
   })
   .catch((error) => {
      console.log("Something error occur in Index.js while connect", error);
   });
