import { app } from "./app.js";
import dotenv from "dotenv";
import { connectDatabase } from "./config/database.js";
import cloudinary from "cloudinary";
import cors from "cors";

//config path
dotenv.config({
  path:"./config/config.env"
});
//Cloudinary configuration
cloudinary.config({
  cloud_name: 'da77sshhs',
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET

});

connectDatabase();
console.clear() // clear the terminal

app.use(cors());

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
