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
exports.markNotificationRead = exports.getUserNotifications = void 0;
const notification_model_1 = require("./notification.model");
/** Get notifications for a user */
const getUserNotifications = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { ref } = req.query;
        if (!ref || typeof ref !== "string") {
            return res
                .status(400)
                .json({ success: false, message: "ref is required" });
        }
        const notifications = yield notification_model_1.NotificationModel.find({ ref })
            .sort({ createdAt: -1 })
            .limit(50);
        return res.status(200).json({ success: true, data: notifications });
    }
    catch (error) {
        console.error("Error fetching notifications:", error.message);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
});
exports.getUserNotifications = getUserNotifications;
/** Mark a notification as read */
const markNotificationRead = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id)
            return res
                .status(400)
                .json({ success: false, message: "Notification id is required" });
        const notification = yield notification_model_1.NotificationModel.findByIdAndUpdate(id, { isRead: true }, { new: true });
        if (!notification)
            return res
                .status(404)
                .json({ success: false, message: "Notification not found" });
        return res.status(200).json({ success: true, data: notification });
    }
    catch (error) {
        console.error("Error updating notification:", error.message);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
});
exports.markNotificationRead = markNotificationRead;
