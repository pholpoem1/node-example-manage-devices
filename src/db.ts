import { Pool } from "pg";
import config from "./config";

export const pool = new Pool({
  user: config.user,
  password: config.password,
  host: config.host,
  port: config.port,
  database: config.database
});
