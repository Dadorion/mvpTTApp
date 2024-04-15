import ProfileService from "../services/profileService.js";


class ProfileController {
  static async getMyProfile(req, res) {
    try {
      const { id } = req.user;

      if (!id) {
        res.status(400).json({ message: "We need ID number." });
      }

      const user = await ProfileService.getMyProfile(id);

      if (!user) {
        res.status(400).json("We have no such user");
      }

      res.status(200).json(user);
    } catch (e) {
      res.status(500).json(e);
    }
  }
}

export default ProfileController;
