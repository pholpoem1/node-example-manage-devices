import { Request, Response } from "express";
import { pool } from "../db";
import { v4 as uuidv4 } from "uuid";

const table_name = "tb_devices";

export const getAllDevices = async (req: Request, res: Response) => {
  try {
    const result = await pool.query(
      `SELECT * FROM "${table_name}" 
      ORDER BY device_name`
    );

    res.json({ items: result.rows, rowCount: result.rowCount });
  } catch (error) {
    console.error("Error fetching devices:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getDeviceById = async (req: Request, res: Response) => {
  const deviceId = req.params.id;

  try {
    const result = await pool.query(
      `SELECT * FROM "${table_name}" WHERE id = $1`,
      [deviceId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Device not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching device by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createDevice = async (req: Request, res: Response) => {
  const { name, type, description } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO "${table_name}" (id, device_name, type, description) VALUES ($1, $2, $3, $4) RETURNING *`,
      [uuidv4(), name, type, description]
    );

    res.json({ data: result.rows[0], message: "Device created successfully" });
  } catch (error) {
    console.error("Error creating device:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateDevice = async (req: Request, res: Response) => {
  const { deviceId, name, type, description } = req.body;

  try {
    const result = await pool.query(
      `UPDATE "${table_name}" SET device_name = $1, type = $2, description = $3 WHERE id = $4 RETURNING *`,
      [name, type, description, deviceId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Device not found" });
    }

    res.json({ data: result.rows[0], message: "Device updated successfully" });
  } catch (error) {
    console.error("Error updating device:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteDevice = async (req: Request, res: Response) => {
  const { deviceId } = req.body;

  try {
    const result = await pool.query(
      `DELETE FROM "${table_name}" WHERE id = $1 RETURNING *`,
      [deviceId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Device not found" });
    }

    res.json({ message: "Device deleted successfully" });
  } catch (error) {
    console.error("Error deleting device:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
