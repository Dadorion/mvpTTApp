import pool from "../../config/database.js";

class HomeService {
  static async getAllMatches(userId) {
    const answer = await pool.query(
      "SELECT count(id) FROM matches WHERE f_player_id = $1 or s_player_id = $1",
      [userId],
    );

    return answer.rows[0].count;
  }

  static async getAllWins(id) {
    const answer = await pool.query(
      "SELECT count(id) FROM matches WHERE (f_player_id = $1 and f_score > s_score) or (s_player_id = $1 and s_score > f_score)",
      [id],
    );

    return answer.rows[0].count;
  }
}

export default HomeService;
