import express, { Request, Response } from "express";
import { pool } from "../db";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  const { table_name, column, type } = req.body;

  try {
    await pool.query(
      `ALTER TABLE "${table_name}" ALTER COLUMN ${column} TYPE ${type}`
    );

    res.json({ message: "Update successful" });
  } catch (error) {
    console.error("Error during update table:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
