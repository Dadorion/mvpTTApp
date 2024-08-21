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

  static async getLast(userId) {
    const answer = await pool.query(
      "SELECT id FROM tournaments WHERE user_id = $1 order by id desc LIMIT 1",
      [userId],
    );

    return answer.rows[0];
  }

  static async check(userId) {
    const answer = await pool.query(
      "SELECT on_air FROM tournaments WHERE user_id = $1 order by id desc LIMIT 1",
      [userId],
    );
    return answer.rows[0];
  }

  static async add(userId) {
    const answer = await pool.query(
      "INSERT INTO tournaments (user_id) VALUES ($1) RETURNING id",
      [userId],
    );

    return answer.rows[0].id;
  }

  static async close(userId) {
    const lastTournamentId = await pool.query(
      "SELECT id FROM tournaments WHERE user_id = $1 order by id desc LIMIT 1",
      [userId],
    );
    const answer = await pool.query(
      "UPDATE tournaments SET on_air = false WHERE id = $1 RETURNING on_air",
      [lastTournamentId.rows[0].id],
    );

    return answer.rows[0].on_air;
  }

  static async getSummary(userId) {
    const lastTournamentId = await pool.query(
      "SELECT id FROM tournaments WHERE user_id = $1 order by id desc LIMIT 1",
      [userId],
    );
    const answer = await pool.query(
      "SELECT * FROM matches WHERE tournament_id = $1",
      [lastTournamentId.rows[0].id],
    );

    return answer.rows;
  }
}

export default TournamentsService;
