import PlayersService from "../services/playersService.js";

class PlayersController {
  static async getMyPlayers(req, res) {
    try {
      const { userId } = req.user;

      if (!userId) {
        res.status(400).json({ message: "We need ID number." });
      }
      const players = await PlayersService.getAll(userId);

      if (!players) {
        res.status(400).json("No players were found");
      }

      res.status(200).json(players);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  static async addNewPlayers(req, res) {
    try {
      const { userId } = req.user;
      const { name, surname } = req.body;

      if (!userId) {
        res.status(400).json({ message: "We need ID number." });
      }
      const newPlayer = await PlayersService.createNewPlayer(
        userId,
        name,
        surname,
      );

      if (!newPlayer) {
        res.status(400).json("The player has not been added");
      }

      res.status(200).json(newPlayer);
    } catch (e) {
      res.status(500).json(e);
    }
  }
}

export default PlayersController;
