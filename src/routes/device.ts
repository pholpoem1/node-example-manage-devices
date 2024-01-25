import express from "express";
import * as deviceController from "../controllers/deviceController";
import { authenticateJWT } from "../middleware/authMiddleware";

const router = express.Router();
router.use(authenticateJWT);

router.get("/devices", authenticateJWT, deviceController.getAllDevices);
router.get("/devices/:id", authenticateJWT, deviceController.getDeviceById);
router.post("/create-device", authenticateJWT, deviceController.createDevice);
router.post("/update-device", authenticateJWT, deviceController.updateDevice);
router.post("/delete-device", authenticateJWT, deviceController.deleteDevice);

export default router;
