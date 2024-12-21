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

  static async getLossesList(id) {
    const answer = await pool.query(
      "SELECT fp.p_name as fp_name, fp.p_surname as fp_surname, sp.p_name as sp_name, sp.p_surname as sp_surname, count(m.id) as count FROM matches m JOIN players fp ON m.f_player_id = fp.id JOIN players sp ON m.s_player_id = sp.id WHERE (f_player_id = $1 and f_score < s_score) or (s_player_id = $1 and s_score < f_score) GROUP BY fp.p_name, fp.p_surname , sp.p_name, sp.p_surname ORDER BY count DESC",
      [id],
    );

    return answer.rows;
  }
}

export default HomeService;
