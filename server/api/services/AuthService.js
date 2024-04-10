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
      `SELECT * FROM players WHERE user_id = $1`,
      [id],
    );
    return answer.rows[0];
  }

  static async addUser(email, name, surname, birthday, cityId, hashPassword) {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      // Вставляем пользователя и получаем его id
      const userResult = await client.query(
        "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id",
        [email, hashPassword],
      );

      const userId = userResult.rows[0].id;

      const playerResult = await client.query(
        "INSERT INTO players (name, surname, birthday, city_id, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [name, surname, birthday, cityId, userId],
      );

      let authRole = null;
      const authRoleDefault = 2;

      if (!authRole) {
        authRole = authRoleDefault;
      }

      await client.query(
        "INSERT INTO auth_role_users (auth_role_id, user_id) VALUES ($1, $2)",
        [authRole, userId],
      );

      await client.query("COMMIT"); // Завершаем транзакцию

      return {
        user: userResult.rows[0],
        player: playerResult.rows[0],
      };
    } catch (error) {
      await client.query("ROLLBACK"); // Откатываем транзакцию при ошибке
      throw error; // Передаем ошибку наверх для обработки
    } finally {
      client.release(); // Возвращаем клиента в пул соединений
    }
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
      `
        SELECT
          u.id AS user_id,
          p.name,
          p.surname,
          p.birthday,
          p.status,
          u.email,
          s.name AS city
        FROM players AS p
          JOIN users AS u ON u.id = p.user_id
          JOIN cities AS s ON s.id = p.city_id
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

export default new AuthService();
