import pkg from "pg";

const { Pool } = pkg;

const config = {
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "111",
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_DB || "ttApp",
};
const pool = new Pool(config);

export default pool;