import { Router } from "express";
import HomeController from "../controllers/homeController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const homeRouter = new Router();

homeRouter.get("/all_matches", authMiddleware, HomeController.getAllMatches);
homeRouter.get("/all_wins", authMiddleware, HomeController.getAllWins);
homeRouter.get("/losses_list", authMiddleware, HomeController.getLossesList);

export default homeRouter;
