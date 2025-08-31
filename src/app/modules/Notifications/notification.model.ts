import { Schema, model, connect, Types } from "mongoose";
import { INotification } from "./notification.interface";

const NotificationSchema = new Schema<INotification>(
  {
    friendId: {
      type: Schema.Types.ObjectId,
      ref: "friends",
      required: true,
    } as any, // kon friend er jonno
    name: { type: String, required: true }, // friend name
    date: { type: Date, required: true }, // friend birthday
    ref: { type: String, required: true }, // owner user email
    remain: { type: Number, required: true }, // days until birthday
    isRead: { type: Boolean, default: false }, // user read/unread
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const NotificationModel = model<INotification>(
  "notification",
  NotificationSchema
);
