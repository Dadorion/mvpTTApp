import pool from "../../config/database.js";

class ProfileService {


  static async getMyProfile(id) {


    const answer = await pool.query(
      "SELECT * FROM users WHERE id = $1",
      [id],
    );

    const result = {
      pagination: {
        usersCount: answer.rows.length,
      },

      body: [...answer.rows],
    };

    return result;
  }

  static async updateMyPassword({ id, email, password }) {
    const updatedUser = await pool.query(
      "UPDATE users SET email = $2, email = $3 WHERE id = $1",
      [id, email, password],
    );

    return updatedUser.rows;
  }
}

export default new ProfileService();
