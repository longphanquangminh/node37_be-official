import express from "express";
import { getInfo, getUser, updateInfo, uploadAvatar } from "../controllers/userController.js";

const userRoute = express.Router();

// Refresh Token => làm mới lại token

// API get video pagination
userRoute.get("/get-user", getUser);

// API get info user
userRoute.get("/get-info", getInfo);

// API update info user
userRoute.put("/update-info", updateInfo);

// API upload avatar
// yarn add multer

// process.cwd() // trả về đường dẫn gốc của source

import upload from "../config/upload.js";

userRoute.post("/upload-avatar", upload.single("avatar"), uploadAvatar);

export default userRoute;

// localhost:8080/user/get-user
