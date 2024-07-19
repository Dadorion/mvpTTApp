import { Router } from "express";
import userRouter from "./userRouter.js";
import authMiddleware from "../middleware/authMiddleware.js";
import profileRouter from "./profileRouter.js";
import playersRouter from "./playersRouter.js";
import tournamentsRouter from "./tournamentsRouter.js";

const mainRouter = new Router();

mainRouter.use("/users", authMiddleware, userRouter);
mainRouter.use("/profile", authMiddleware, profileRouter);
mainRouter.use("/players", authMiddleware, playersRouter);
mainRouter.use("/tournaments", authMiddleware, tournamentsRouter);

export default mainRouter;
