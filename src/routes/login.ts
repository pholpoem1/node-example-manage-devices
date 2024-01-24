import express, { Request, Response } from "express";
import { pool } from "../db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config";

const secretKey = config.secretKey as string;
const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    // Retrieve user data from the database
    const result = await pool.query(
      "SELECT * FROM tb_users WHERE username = $1",
      [username]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // Compare hashed password
    const hashedPassword = result.rows[0].password;
    const passwordMatch = await bcrypt.compare(password, hashedPassword);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const token = jwt.sign({ username }, secretKey, {
      // expiresIn: 60
      expiresIn: "1h"
    });

    res.json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
