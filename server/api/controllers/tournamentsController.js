import TournamentsService from "../services/tournamentsService.js";

class TournamentsController {
  static async getAllTournaments(req, res) {
    try {
      const { userId } = req.user;

      if (!userId) {
        res.status(400).json({ message: "We need ID number." });
      }
      const tournaments = await TournamentsService.getAll(userId);

      if (!tournaments) {
        res.status(400).json("No tournaments found");
      }

      res.status(200).json(tournaments);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  static async getOneTournament(req, res) {
    try {
      const { userId } = req.user;
      const  tournamentId  = req.params.id;


      if (!userId) {
        res.status(400).json({ message: "We need ID number." });
      }
      const tournament = await TournamentsService.getOne(userId, tournamentId);

      if (!tournament) {
        res.status(400).json("Tournament not found");
      }

      res.status(200).json(tournament);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  static async addNewTournament(req, res) {
    try {
      const { userId } = req.user;

      if (!userId) {
        res.status(400).json({ message: "We need ID number." });
      }
      const tournament = await TournamentsService.add(userId);

      if (!tournament) {
        res.status(400).json("Tournament was not created");
      }

      res.status(200).json(tournament);
    } catch (e) {
      res.status(500).json(e);
    }
  }

}

export default TournamentsController;
