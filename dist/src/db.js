"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const pg_1 = require("pg");
const config_1 = __importDefault(require("./config"));
exports.pool = new pg_1.Pool({
    user: config_1.default.user,
    password: config_1.default.password,
    host: config_1.default.host,
    port: config_1.default.port,
    database: config_1.default.database
});
