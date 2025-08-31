import { Request, Response } from "express";
import { NotificationModel } from "./notification.model";

/** Get notifications for a user */
export const getUserNotifications = async (req: Request, res: Response) => {
  try {
    const { ref } = req.query;
    if (!ref || typeof ref !== "string") {
      return res
        .status(400)
        .json({ success: false, message: "ref is required" });
    }

    const notifications = await NotificationModel.find({ ref })
      .sort({ createdAt: -1 })
      .limit(50);

    return res.status(200).json({ success: true, data: notifications });
  } catch (error: any) {
    console.error("Error fetching notifications:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

/** Mark a notification as read */
export const markNotificationRead = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id)
      return res
        .status(400)
        .json({ success: false, message: "Notification id is required" });

    const notification = await NotificationModel.findByIdAndUpdate(
      id,
      { isRead: true },
      { new: true }
    );

    if (!notification)
      return res
        .status(404)
        .json({ success: false, message: "Notification not found" });

    return res.status(200).json({ success: true, data: notification });
  } catch (error: any) {
    console.error("Error updating notification:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
