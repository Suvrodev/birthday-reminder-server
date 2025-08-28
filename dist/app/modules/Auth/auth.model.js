"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = void 0;
const mongoose_1 = require("mongoose");
const authSchema = new mongoose_1.Schema({
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
    image: {
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
}, {
    timestamps: true,
    toJSON: {
        transform: function (_doc, ret) {
            delete ret.password;
            delete ret.__v;
            delete ret.createdAt;
            delete ret.updatedAt;
        },
    },
});
exports.userModel = (0, mongoose_1.model)("user", authSchema);
