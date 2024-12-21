import HomeService from "../services/homeService.js";
import UserService from "../services/UserService.js";

class HomeController {
  static async getAllMatches(req, res) {
    try {
      const { userId } = req.user;

      if (!userId) {
        res.status(400).json({ message: "We need ID number." });
      }
      const playerID = await UserService.getMyPlayerId(userId);
      const count = await HomeService.getAllMatches(playerID);

      if (!count && count !== 0) {
        res.status(400).json("No matches found");
      }

      res.status(200).json(count);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  static async getAllWins(req, res) {
    try {
      const { userId } = req.user;

      if (!userId) {
        res.status(400).json({ message: "We need ID number." });
      }
      const playerID = await UserService.getMyPlayerId(userId);
      const count = await HomeService.getAllWins(playerID);

      if (!count && count !== 0) {
        res.status(400).json("No wins found");
      }

      res.status(200).json(count);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  static async getLossesList(req, res) {
    try {
      const { userId } = req.user;

      if (!userId) {
        res.status(400).json({ message: "We need ID number." });
      }
      const playerID = await UserService.getMyPlayerId(userId);
      const list = await HomeService.getLossesList(playerID);

      res.status(200).json(list);
    } catch (e) {
      res.status(500).json(e);
    }
  }
}

export default HomeController;
