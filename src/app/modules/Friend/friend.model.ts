import { Schema, model, connect, Types } from "mongoose";
import { TFriend } from "./friend.interface";

const friendSchema = new Schema<TFriend>(
  {
    name: { type: String, required: [true, "Name is required"], maxlength: 25 },
    date: { type: Date, required: [true, "Date is required"] },
    photo: { type: String, required: [true, "Photo is required"] }, // base64 string
    ratting: { type: Number, required: [true, "Rating is required"] },
    phone: { type: String }, // optional
    location: { type: String }, // optional
    ref: { type: String, required: [true, "Ref is required"] },
  },
  { timestamps: true }
);

export const FriendModel = model<TFriend>("friends", friendSchema);
