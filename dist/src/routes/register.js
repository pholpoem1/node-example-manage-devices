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
const express_1 = __importDefault(require("express"));
const db_1 = require("../db");
const config_1 = __importDefault(require("../config"));
const uuid_1 = require("uuid");
const bcrypt_1 = __importDefault(require("bcrypt"));
const router = express_1.default.Router();
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    try {
        // Check if username or email already exists
        const existingUser = yield db_1.pool.query(`SELECT * FROM "${config_1.default.table}" WHERE username = $1 OR email = $2`, [username, email]);
        if (existingUser.rows.length > 0) {
            return res
                .status(409)
                .json({ error: "Username or email already exists" });
        }
        let hashPassword = bcrypt_1.default.hashSync(password, 10);
        const result = yield db_1.pool.query("INSERT INTO tb_users (id, username, email, password) VALUES ($1, $2, $3, $4) RETURNING *", [(0, uuid_1.v4)(), username, email, hashPassword]);
        res.json(result.rows[0]);
    }
    catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}));
exports.default = router;
