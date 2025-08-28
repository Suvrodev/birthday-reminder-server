import { model, Schema } from "mongoose";
import { TLoginUser } from "./auth.interface";

const authSchema = new Schema<TLoginUser>(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        "Please enter a valid email address",
      ],
    },

    profileImage: {
      type: String,
      default: "https://i.ibb.co/d4rvmWjR/logged-User.png",
    },
    phone: {
      type: String,
    },
    whatsapp: {
      type: String,
    },
    facebook: {
      type: String,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (_doc, ret) {
        delete ret.password;
        delete ret.__v;
        delete ret.createdAt;
        delete ret.updatedAt;
      },
    },
  }
);

export const userModel = model<TLoginUser>("user", authSchema);
