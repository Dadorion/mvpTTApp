import { Router } from "express";
import userRouter from "./UserRouter.js";
import authMiddleware from "../middleware/authMiddleware.js";
import checkUserRoleMiddleware from "../middleware/roleMiddleware.js";

const mainRouter = new Router();

mainRouter.use("/users", authMiddleware, checkUserRoleMiddleware, userRouter);

export default mainRouter;
