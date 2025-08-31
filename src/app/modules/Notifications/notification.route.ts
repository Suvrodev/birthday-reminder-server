import express from "express";
import { NotificationController } from "./notification.controller";

const router = express.Router();

//will call controller function

router.get("/", NotificationController.getUserNotifications);
router.post("/:id", NotificationController.markNotificationRead);

export const NotificationRouter = router;
