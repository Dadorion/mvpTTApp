import pool from "../../config/database";

class PlayerService {
  static async create({ id, name, surname }) {
    const newPlayer = await pool.query(
      "INSERT INTO players (user_id, p_name, p_surname) VALUES ($1, $2, $3)",
      [id, name, surname],
    );

    return newPlayer;
  }

  static async getAll({page, limit}) {
    const offset = (page - 1) * limit;

    const answer = await pool.query(
      "SELECT * FROM players LIMIT = $1 OFFSET = $2",
      [limit, offset],
    );

    const result = {
      pagination: {
        usersCount: answer.rows.length,
      },

      body: [...answer.rows],
    };

    return result;
  }

  static async updateMyPassword({ id, name, surname }) {
    const updatedPlayer = await pool.query(
      "UPDATE players SET p_name = $2, p_surname = $3 WHERE id = $1",
      [id, name, surname],
    );

    return updatedPlayer.rows;
  }
}

export default new PlayerService();
