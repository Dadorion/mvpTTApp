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

  static async getPlayerStats(playerId) {
    await pool.query("BEGIN");

    const playerName = await pool.query(
      "SELECT p.p_name, p.p_surname FROM players p WHERE id = $1",
      [playerId],
    );
    const allMatches = await pool.query(
      "SELECT count(id) FROM matches WHERE f_player_id = $1 or s_player_id = $1",
      [playerId],
    );

    const allWins = await pool.query(
      "SELECT count(id) FROM matches WHERE (f_player_id = $1 and f_score > s_score) or (s_player_id = $1 and s_score > f_score)",
      [playerId],
    );

    const allTournaments = await pool.query(
      "SELECT count(id) FROM tournaments WHERE user_id = $1",
      [playerId],
    );

    const lossesList = await pool.query(
      "SELECT fp.id as fp_id, sp.id as sp_id,fp.p_name as fp_name, fp.p_surname as fp_surname, sp.p_name as sp_name, sp.p_surname as sp_surname, count(m.id) as count FROM matches m JOIN players fp ON m.f_player_id = fp.id JOIN players sp ON m.s_player_id = sp.id WHERE (f_player_id = $1 and f_score < s_score) or (s_player_id = $1 and s_score < f_score) GROUP BY fp.id, sp.id, fp.p_name, fp.p_surname , sp.p_name, sp.p_surname ORDER BY count DESC",
      [playerId],
    );

    await pool.query("END");

    const result = {
      name: playerName.rows[0].p_name,
      surname: playerName.rows[0].p_surname,
      matches: allMatches.rows[0].count,
      wins: allWins.rows[0].count,
      tournaments: allTournaments.rows[0].count,
      lossesList: lossesList.rows,
    };

    return result;
  }

  static async createNewPlayer(userId, name, surname) {
    const answer = await pool.query(
      "INSERT INTO players (user_id, p_name, p_surname) VALUES ($1, $2, $3)",
      [userId, name, surname],
    );
    return answer.rows;
  }
}

export default PlayersService;
