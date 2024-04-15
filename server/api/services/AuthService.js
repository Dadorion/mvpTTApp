import pool from "../../config/database.js";

class AuthService {
  static async getUser(email) {
    const answer = await pool.query(`SELECT * FROM users WHERE email = $1`, [
      email,
    ]);

    return answer.rows[0];
  }

  static async getUserWithId(id) {
    const answer = await pool.query(`SELECT * FROM users WHERE id = $1`, [id]);
    return answer.rows[0];
  }

  static async getPlayer(id) {
    const answer = await pool.query(
      `SELECT * FROM players WHERE user_id = $1 RETURNING id`,
      [id],
    );
    return answer.rows[0];
  }

  static async addUser(email, hashPassword) {
    const userResult = await pool.query(
      "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id",
      [email, hashPassword],
    );

    return userResult.rows[0];
  }

  static async login(id) {
    const answer = await pool.query(`SELECT * FROM users WHERE id = $1`, [id]);
    return answer.rows[0];
  }

  static async logout(token, expiration) {
    const answer = await pool.query(
      "INSERT INTO token_blacklist (token, expiration) VALUES ($1, $2)",
      [token, expiration],
    );
    return answer.rows[0];
  }

  static async me(userId) {
    const answer = await pool.query(
      `SELECT
          u.id user_id,
          u.email
        FROM users u
        WHERE u.id = $1`,
      [userId],
    );
    return answer.rows[0];
  }

  static async blacklist(token) {
    const answer = await pool.query(
      "SELECT * FROM token_blacklist WHERE token = $1",
      [token],
    );
    return answer.rows;
  }

  static async updatePassword(pass, id) {
    const answer = await pool.query(
      "UPDATE users SET password = $1 WHERE id = $2",
      [pass, id],
    );
    return answer.rows;
  }
}

export default AuthService;
