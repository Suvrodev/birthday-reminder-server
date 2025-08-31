import { NotificationModel } from "./notification.model";

// Get Single Friend
const getNotificationFromDB = async (ref: string) => {
  try {
    const result = await NotificationModel.find({ ref })
      .sort({ createdAt: -1 })
      .limit(50);
    return result;
  } catch (error) {
    throw new Error("Notification Not Found");
  }
};

// Delete Friend
// const deleteFriendFromDB = async (friendId: string) => {
//   const result = await FriendModel.findByIdAndDelete({ _id: friendId });
//   return result;
// };

// Update Friend
const updateNotificationFromDB = async (notificationId: string) => {
  console.log("Notification id:", notificationId);

  const result = await NotificationModel.findOneAndUpdate(
    { _id: notificationId },
    { $set: { isRead: "true" } },
    {
      new: true,
    }
  );
  return result;
};

export const NotificationRestService = {
  getNotificationFromDB,
  updateNotificationFromDB,
};
