import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
cloudinary.config({
   cloud_name: process.env.CLOUD_NAME,
   api_key: process.env.CLOUDINARY_API_KEY,
   api_secret: process.env.SECRETE_KEY,
});
console.log("CLOUD_NAME:", process.env.CLOUD_NAME);
console.log("CLOUDINARY_API_KEY:", process.env.CLOUDINARY_API_KEY);
console.log("SECRETE_KEY:", process.env.SECRETE_KEY);

const uploadOnCloudinary = async (localFilePath) => {
   try {
      if (!localFilePath) return null;
      const response = await cloudinary.uploader.upload(localFilePath, {
         resource_type: "auto",
      });
      fs.unlinkSync(localFilePath);
      return response;
   } catch (error) {
      console.log("Error occur at cloudinary utils", error);
      fs.unlinkSync(localFilePath);
      return null;
   }
};

export { uploadOnCloudinary };
