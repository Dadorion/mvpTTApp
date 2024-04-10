import pool from "../../config/database.js";

class UserService {
  static async create({ email, password }) {
    const newPlayer = await pool.query(
      "INSERT INTO users (email, password) VALUES ($1, $2)",
      [email, password],
    );

    return newPlayer;
  }

  static async getAll({ page, limit }) {
    const offset = (page - 1) * limit;

    const answer = await pool.query(
      "SELECT * FROM users LIMIT = $1 OFFSET = $2",
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

  static async updateMyPassword({ id, email, password }) {
    const updatedUser = await pool.query(
      "UPDATE users SET email = $2, email = $3 WHERE id = $1",
      [id, email, password],
    );

    return updatedUser.rows;
  }
}

export default new UserService();
