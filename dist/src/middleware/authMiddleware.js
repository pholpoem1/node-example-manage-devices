"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const secretKey = config_1.default.secretKey;
const authenticateJWT = (req, res, next) => {
    try {
        const bearerToken = req.header("Authorization");
        if (!bearerToken) {
            return res.status(401).json({ error: "Unauthorized: Missing Token" });
        }
        let token = bearerToken.split(" ")[1];
        jsonwebtoken_1.default.verify(token, secretKey, (err, user) => {
            if (err) {
                return res.status(403).json({ error: "Forbidden: Invalid Token" });
            }
            const currentTimestamp = Math.floor(Date.now() / 1000);
            if (user.exp && currentTimestamp > user.exp) {
                return res.status(401).json({ error: "Unauthorized: Token Expired" });
            }
            req.user = user;
            next();
        });
    }
    catch (error) {
        console.error("Error during middleware:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.authenticateJWT = authenticateJWT;
