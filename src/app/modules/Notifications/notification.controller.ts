import { Request, RequestHandler, Response } from "express";
import { NotificationModel } from "./notification.model";
import { NotificationRestService } from "./notificationResTService";
import AppError from "../../errors/AppError";

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
export const getUserNotifications: RequestHandler = async (req, res, next) => {
  try {
    const { ref } = req.query;
    if (!ref || typeof ref !== "string") {
      res.status(400).json({ success: false, message: "ref is required" });
      return;
    }

    const result = await NotificationRestService.getNotificationFromDB(ref);
    res.status(200).json({
      message: "Notification retrieved successfully",
      success: true,
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};

/** Mark a notification as read */
export const markNotificationRead: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log("Come ID: ", id);
    if (!id) {
      throw new AppError(404, "Notification not found");
    }

    const result = await NotificationRestService.updateNotificationFromDB(id);
    res.status(200).json({
      message: "Notification retrieved successfully",
      success: true,
      data: result,
    });
  } catch (error: any) {
    console.error("Error updating notification:", error.message);
    next(error);
  }
};

export const NotificationController = {
  getUserNotifications,
  markNotificationRead,
};
