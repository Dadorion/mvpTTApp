import { Router } from "express";
import userRouter from "./UserRouter";
import authMiddleware from "../middleware/authMiddleware";
import checkUserRoleMiddleware from "../middleware/roleMiddleware";

const router = new Router();

router.use("/users", authMiddleware, checkUserRoleMiddleware, userRouter);

export default router;
