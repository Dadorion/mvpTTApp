import pool from "../../config/database.js";

class PlayersService {
  static async getAll(userId) {
    const answer = await pool.query(
      "SELECT * FROM players WHERE user_id = $1",
      [userId],
    );

    const result = {
      pagination: {
        playersCount: answer.rows.length,
      },

      body: [...answer.rows],
    };

    return result;
  }

  static async createNewPlayer(userId, name, surname) {
    const answer = await pool.query(
      "INSERT INTO players (user_id, p_name, p_surname) VALUES ($1, $2, $3)",
      [userId, name, surname],
    );
    return answer.rows
  }
}

export default PlayersService;
