import { getDaysUntilBirthday } from "../Friend/getDaysUntilBirthday";
import { FriendModel } from "../Friend/friend.model";
import { NotificationModel } from "./notification.model";
import { TFriend } from "../Friend/friend.interface";

/**
 * Auto-create upcoming birthday notifications (remain <= 4 days)
 */
export const createUpcomingBirthdayNotifications = async () => {
  const friends: TFriend[] = await FriendModel.find();
  for (const friend of friends) {
    const dateStr: string =
      typeof friend.date === "string"
        ? friend.date
        : friend.date instanceof Date
        ? friend.date.toISOString()
        : new Date(friend.date).toISOString();

    const remain = getDaysUntilBirthday(dateStr);

    if (remain <= 4) {
      // avoid duplicate notifications
      const existing = await NotificationModel.findOne({
        friendId: friend._id,
        ref: friend.ref,
        remain,
      });

      if (!existing) {
        await NotificationModel.create({
          friendId: friend._id,
          name: friend.name,
          date: friend.date,
          ref: friend.ref,
          remain,
        });
        console.log(`Notification created for ${friend.name}`);
      }
    }
  }
};
