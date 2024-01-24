import express, { Request, Response } from "express";
import { pool } from "../db";
import { v4 as uuidv4 } from "uuid";
import { authenticateJWT } from "../middleware/authMiddleware";

const router = express.Router();
router.use(authenticateJWT);

export const saveLogs = async (
  { username, device }: { username: string; device: string },
  res: Response
) => {
  try {
    await pool.query(
      "INSERT INTO login_logs (id, username, device, login_timestamp) VALUES ($1, $2, $3, $4) RETURNING *",
      [uuidv4(), username, device, new Date()]
    );
  } catch (error) {
    console.error("Error during save logs:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

router.get("/", authenticateJWT, async (req: Request, res: Response) => {
  try {
    // Retrieve login logs from the database
    const result = await pool.query(
      "SELECT * FROM login_logs ORDER BY login_timestamp DESC"
    );

    res.json(result.rows);
  } catch (error) {
    console.error("Error retrieving login logs:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
