"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
exports.default = {
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST,
    port: parseInt(`${process.env.PGPORT}`) || 5432, // default Postgres port
    database: process.env.PGDATABASE,
    table: "tb_users",
    secretKey: process.env.SECRET_KEY
};
