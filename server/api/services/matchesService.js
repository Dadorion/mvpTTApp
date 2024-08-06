import pool from "../../config/database.js";

class MatchesService {
  static async getAll(lastTournament) {
    const answer = await pool.query(
      "SELECT * FROM matches WHERE tournament_id = $1",
      [lastTournament],
    );

    const result = {
      pagination: {
        matchesCount: answer.rows.length,
      },

      body: [...answer.rows],
    };

    return result;
  }

  static async createNewMatches({ tournamentId, matches }) {
    await pool.query("BEGIN");
    for (const match of matches) {
      await pool.query(
        "INSERT INTO matches (tournament_id, f_player_id, s_player_id) VALUES ($1, $2, $3)",
        [tournamentId, match.fPlayerId, match.sPlayerId],
      );
    }
    await pool.query("END");

    return "done";
  }

  static async addScore({ matchId, fScore, sScore }) {
    await pool.query(
      "UPDATE matches SET f_score = $2, s_score = $3 WHERE id = $1",
      [matchId, fScore, sScore],
    );

    return "done";
  }
}

export default MatchesService;
