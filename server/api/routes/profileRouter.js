import { Router } from "express";
import ProfileController from "../controllers/profileController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const profileRouter = new Router();

profileRouter.get("/me", authMiddleware, ProfileController.getMyProfile);

export default profileRouter;
