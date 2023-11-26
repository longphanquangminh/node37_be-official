import express from "express";
import { getInfo, getUser, updateInfo } from "../controllers/userController.js";

const userRoute = express.Router();

userRoute.get("/get-user", getUser);

userRoute.get("/get-info", getInfo);

// API update user info
userRoute.put("/update-info", updateInfo);

export default userRoute;
