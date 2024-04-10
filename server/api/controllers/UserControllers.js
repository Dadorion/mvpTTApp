import UserService from "../services/UserService.js";

class UserController {
  static async create(req, res) {
    try {
      const newUser = await UserService.create(req.body);

      res.json(newUser);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  static async getAll(req, res) {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;

    try {
      const allUsers = await UserService.getAll(page, limit);

      if (!allUsers) {
        res.status(204).json("This table is empty");
      }

      res.status(200).json(allUsers);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  static async getOne(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        res.status(400).json({ message: "We need ID number." });
      }

      const user = await UserService.getOne(id);

      if (!user) {
        res.status(400).json("We have no such user");
      }

      res.status(200).json(user);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.body;
      if (!id) {
        res.status(400).json({ message: "We need ID number." });
      }

      const updatedUser = await UserService.update(req.body);

      res.status(200).json(updatedUser);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  static async updatePassword(req, res) {
    try {
      const { id } = req.body;
      if (!id) {
        res.status(400).json({ message: "We need ID number." });
      }

      const updatedUser = await UserService.updateMyPassword();

      res.status(200).json(updatedUser);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        res.status(400).json({ message: "We need ID number." });
      }

      const deletedUser = await UserService.delete(id);

      if (!deletedUser) {
        res.status(400).json("We have no such user");
      }

      res.status(200).json(deletedUser);
    } catch (e) {
      res.status(500).json(e);
    }
  }
}

export default UserController;
