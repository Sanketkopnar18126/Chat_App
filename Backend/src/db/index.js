import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
const ConnectDb = async () => {
   try {
      // console.log(process.env.MONGODB_URI);
      // console.log(DB_NAME);
      const connectionInstance = await mongoose.connect(
         `${process.env.MONGODB_URI}/${DB_NAME}`
      );
      console.log(
         `\nMongo Successfully connected to MongoDB...!: ${connectionInstance.connection.host}`
      );
   } catch (error) {
      console.error("Error occurred while connecting to MongoDB:", error);
   }
};
export default ConnectDb;
