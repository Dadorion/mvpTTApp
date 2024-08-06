import { Router } from "express";
import MatchesController from "../controllers/matchesController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const playersRouter = new Router();

playersRouter.get("/", authMiddleware, MatchesController.getMyMatches);
playersRouter.get("/last", authMiddleware, MatchesController.getLastMatches);
playersRouter.post("/add_score", authMiddleware, MatchesController.addScore);
playersRouter.post("/", authMiddleware, MatchesController.addNewMatches);

export default playersRouter;
