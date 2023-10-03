import express from "express";

import User from "./routers/User.js";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import cors from "cors";
import dotenv from "dotenv";
import { getAllUsers } from "./controllers/User.js";

export const app = express();
const whitelist = ["http://localhost:3000"]
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true,
}
app.use(cors(corsOptions))
dotenv.config({ path: "./config/config.env"});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
    useTempFiles: true,
  })
  );
  
  app.use("/api/v1", User);
  app.use("/api/v1/admin/users", getAllUsers)
  
  // app.use(express.static(path.join(__dirname, "../frontend/build")));
  // app.get("*", (req, res) => {
  //   res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
  // });
  
