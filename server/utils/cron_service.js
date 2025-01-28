import cron from "node-cron";
import pool from "../config/database.js";
import logger from "./logger.js";

cron.schedule('0 0 * * *', async () => {
  try {
    const result = await pool.query('DELETE FROM token_blacklist WHERE expires_at < NOW()');

    logger.info(`Deleted ${result.rowCount} expired tokens.`);
  } catch (error) {

    logger.error('Error cleaning up expired tokens:', error.message);
  }
});
