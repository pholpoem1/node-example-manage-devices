"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDevice = exports.updateDevice = exports.createDevice = exports.getDeviceById = exports.getAllDevices = void 0;
const db_1 = require("../db");
const uuid_1 = require("uuid");
const table_name = "tb_devices";
const getAllDevices = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("req.query :>> ");
    try {
        const limit = 5;
        const offset = 10;
        const result = yield db_1.pool.query(`SELECT * FROM "${table_name}" ORDER BY device_name LIMIT $1 OFFSET $2`, [limit, offset]);
        res.json(result.rows);
    }
    catch (error) {
        console.error("Error fetching devices:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.getAllDevices = getAllDevices;
const getDeviceById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const deviceId = req.params.id;
    try {
        const result = yield db_1.pool.query(`SELECT * FROM "${table_name}" WHERE id = $1`, [deviceId]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Device not found" });
        }
        res.json(result.rows[0]);
    }
    catch (error) {
        console.error("Error fetching device by ID:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.getDeviceById = getDeviceById;
const createDevice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, type, description } = req.body;
    try {
        const result = yield db_1.pool.query(`INSERT INTO "${table_name}" (id, device_name, type, description) VALUES ($1, $2, $3, $4) RETURNING *`, [(0, uuid_1.v4)(), name, type, description]);
        res.json(result.rows[0]);
    }
    catch (error) {
        console.error("Error creating device:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.createDevice = createDevice;
const updateDevice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { deviceId, name, type, description } = req.body;
    try {
        const result = yield db_1.pool.query(`UPDATE "${table_name}" SET device_name = $1, type = $2, description = $3 WHERE id = $4 RETURNING *`, [name, type, description, deviceId]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Device not found" });
        }
        res.json(result.rows[0]);
    }
    catch (error) {
        console.error("Error updating device:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.updateDevice = updateDevice;
const deleteDevice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { deviceId } = req.body;
    try {
        const result = yield db_1.pool.query(`DELETE FROM "${table_name}" WHERE id = $1 RETURNING *`, [deviceId]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Device not found" });
        }
        res.json({ message: "Device deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting device:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.deleteDevice = deleteDevice;
