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
exports.NotificationController = exports.markNotificationRead = exports.getUserNotifications = void 0;
const notificationResTService_1 = require("./notificationResTService");
const AppError_1 = __importDefault(require("../../errors/AppError"));
/** Get notifications for a user */
// export const getUserNotifications = async (req: Request, res: Response) => {
//   try {
//     const { ref } = req.query;
//     if (!ref || typeof ref !== "string") {
//       return res
//         .status(400)
//         .json({ success: false, message: "ref is required" });
//     }
//     const notifications = await NotificationModel.find({ ref })
//       .sort({ createdAt: -1 })
//       .limit(50);
//     res.status(200).json({ success: true, data: notifications });
//   } catch (error: any) {
//     console.error("Error fetching notifications:", error.message);
//     return res.status(500).json({
//       success: false,
//       message: "Internal Server Error",
//       error: error.message,
//     });
//   }
// };
// get Step-2 and okay
// export const getUserNotifications: RequestHandler = async (req, res) => {
//   try {
//     const { ref } = req.query;
//     if (!ref || typeof ref !== "string") {
//       res.status(400).json({ success: false, message: "ref is required" });
//       return;
//     }
//     const notifications = await NotificationModel.find({ ref })
//       .sort({ createdAt: -1 })
//       .limit(50);
//     res.status(200).json({ success: true, data: notifications });
//   } catch (error: any) {
//     console.error("Error fetching notifications:", error.message);
//     res.status(500).json({
//       success: false,
//       message: "Internal Server Error",
//       error: error.message,
//     });
//   }
// };
// get Step-3 (My Own Style)
const getUserNotifications = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { ref } = req.query;
        if (!ref || typeof ref !== "string") {
            res.status(400).json({ success: false, message: "ref is required" });
            return;
        }
        const result = yield notificationResTService_1.NotificationRestService.getNotificationFromDB(ref);
        res.status(200).json({
            message: "Notification retrieved successfully",
            success: true,
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getUserNotifications = getUserNotifications;
/** Mark a notification as read */
const markNotificationRead = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        console.log("Come ID: ", id);
        if (!id) {
            throw new AppError_1.default(404, "Notification not found");
        }
        const result = yield notificationResTService_1.NotificationRestService.updateNotificationFromDB(id);
        res.status(200).json({
            message: "Notification retrieved successfully",
            success: true,
            data: result,
        });
    }
    catch (error) {
        console.error("Error updating notification:", error.message);
        next(error);
    }
});
exports.markNotificationRead = markNotificationRead;
exports.NotificationController = {
    getUserNotifications: exports.getUserNotifications,
    markNotificationRead: exports.markNotificationRead,
};
