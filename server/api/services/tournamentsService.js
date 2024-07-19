import pool from "../../config/database.js";

class TournamentsService {
  static async getAll(userId) {
    const answer = await pool.query(
      "SELECT * FROM tournaments WHERE user_id = $1",
      [userId],
    );

    const result = {
      pagination: {
        tournamentsCount: answer.rows.length,
      },

      body: [...answer.rows],
    };

    return result;
  }

  static async getOne(userId, tournamentId) {
    const answer = await pool.query(
      "SELECT * FROM tournaments WHERE user_id = $1 AND id = $2",
      [userId, tournamentId],
    );

    return answer.rows;
  }

  static async add(userId) {
    const answer = await pool.query(
      "INSERT INTO tournaments (user_id) VALUES ($1) RETURNING id",
      [userId],
    );

    return answer.rows[0].id;
  }
}

export default TournamentsService;
