import { Router } from "express";
import TournamentsController from "../controllers/tournamentsController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const tournamentsRouter = new Router();

tournamentsRouter.get("/add", authMiddleware, TournamentsController.addNewTournament);
tournamentsRouter.get("/check", authMiddleware, TournamentsController.checkTournamentOnAir);
tournamentsRouter.get("/", authMiddleware, TournamentsController.getAllTournaments);
tournamentsRouter.get("/:id", authMiddleware, TournamentsController.getOneTournament);

export default tournamentsRouter;

