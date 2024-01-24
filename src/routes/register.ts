import express, { Request, Response } from "express";
import { pool } from "../db";
import config from "../config";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  try {
    // Check if username or email already exists
    const existingUser = await pool.query(
      `SELECT * FROM "${config.table}" WHERE username = $1 OR email = $2`,
      [username, email]
    );

    if (existingUser.rows.length > 0) {
      return res
        .status(409)
        .json({ error: "Username or email already exists" });
    }

    let hashPassword = bcrypt.hashSync(password, 10);

    const result = await pool.query(
      "INSERT INTO tb_users (id, username, email, password) VALUES ($1, $2, $3, $4) RETURNING *",
      [uuidv4(), username, email, hashPassword]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
