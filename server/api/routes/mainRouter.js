import { Router } from "express";
import userRouter from "./userRouter.js";
import authMiddleware from "../middleware/authMiddleware.js";
import profileRouter from "./profileRouter.js";

const mainRouter = new Router();

mainRouter.use("/users", authMiddleware, userRouter);
mainRouter.use("/profile", authMiddleware, profileRouter);

export default mainRouter;
