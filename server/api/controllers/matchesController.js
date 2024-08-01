import MatchesService from "../services/matchesService.js";
import TournamentsService from "../services/tournamentsService.js";
import PlayersService from "../services/playersService.js";

import makeQueue from "../middleware/queueReduce.js";

class MatchesController {
  static async getLastMatches(req, res) {
    try {
      const { userId } = req.user;

      if (!userId) {
        res.status(400).json({ message: "We need ID number." });
      }

      const lastTournament = await TournamentsService.getLast(userId);
      const playersAnswer = (await PlayersService.getAll(userId)).body;
      const matchesAnswer = (await MatchesService.getAll(lastTournament.id))
        .body;

      if (!matchesAnswer) {
        res.status(400).json("Matches not found");
      }

      const queue = makeQueue({ playersAnswer, matchesAnswer });

      res.status(200).json(queue);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  static async getMyMatches(req, res) {
    try {
      const { userId } = req.user;

      if (!userId) {
        res.status(400).json({ message: "We need ID number." });
      }

      const lastTournament = await TournamentsService.getLast(userId);
      const matches = await MatchesService.getAll(lastTournament.id);

      if (!matches) {
        res.status(400).json("Matches not found");
      }

      res.status(200).json(matches);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  static async addNewMatches(req, res) {
    try {
      const { userId } = req.user;
      const { tournamentId, matches } = req.body;
      console.log({ tournamentId, matches });

      if (!userId) {
        res.status(400).json({ message: "We need ID number." });
      }

      const isDone = await MatchesService.createNewMatches({
        tournamentId,
        matches,
      });

      if (!isDone) {
        res.status(400).json("Matches not added");
      }

      res.status(200).json(isDone);
    } catch (e) {
      res.status(500).json(e);
    }
  }
}

export default MatchesController;
