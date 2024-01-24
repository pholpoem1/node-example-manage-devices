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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveLogs = void 0;
const express_1 = __importDefault(require("express"));
const db_1 = require("../db");
const uuid_1 = require("uuid");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.use(authMiddleware_1.authenticateJWT);
const saveLogs = ({ username, device }, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db_1.pool.query("INSERT INTO login_logs (id, username, device, login_timestamp) VALUES ($1, $2, $3, $4) RETURNING *", [(0, uuid_1.v4)(), username, device, new Date()]);
    }
    catch (error) {
        console.error("Error during save logs:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.saveLogs = saveLogs;
router.get("/", authMiddleware_1.authenticateJWT, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Retrieve login logs from the database
        const result = yield db_1.pool.query("SELECT * FROM login_logs ORDER BY login_timestamp DESC");
        res.json(result.rows);
    }
    catch (error) {
        console.error("Error retrieving login logs:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}));
exports.default = router;
