import express from "express";
import { getUser } from "../controllers/userController.js";

const userRoute = express.Router();

userRoute.get("/get-user", getUser);

export default userRoute;
