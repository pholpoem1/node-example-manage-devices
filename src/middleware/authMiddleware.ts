import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import config from "../config";
import { error } from "console";

const secretKey = config.secretKey as string;

export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bearerToken = req.header("Authorization");

    if (!bearerToken) {
      return res.status(401).json({ error: "Unauthorized: Missing Token" });
    }

    let token = bearerToken.split(" ")[1];

    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        return res.status(403).json({ error: "Forbidden: Invalid Token" });
      }

      const currentTimestamp = Math.floor(Date.now() / 1000);
      if ((user as any).exp && currentTimestamp > (user as any).exp) {
        return res.status(401).json({ error: "Unauthorized: Token Expired" });
      }

      (req as any).user = user;
      next();
    });
  } catch (error) {
    console.error("Error during middleware:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
