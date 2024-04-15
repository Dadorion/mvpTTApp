import { Router } from "express";
import userRouter from "./UserRouter.js";
import authMiddleware from "../middleware/authMiddleware.js";

const mainRouter = new Router();

mainRouter.use("/users", authMiddleware, userRouter);

export default mainRouter;
