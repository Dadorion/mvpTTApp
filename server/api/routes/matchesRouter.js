import { Router } from "express";
import PlayersController from "../controllers/playersController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const playersRouter = new Router();

playersRouter.get("/", authMiddleware, PlayersController.getMyPlayers);
playersRouter.post("/", authMiddleware, PlayersController.addNewPlayers);

export default playersRouter;
