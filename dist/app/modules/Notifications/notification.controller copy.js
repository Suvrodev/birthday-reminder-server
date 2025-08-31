"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FriendModel = void 0;
const mongoose_1 = require("mongoose");
const NotificationSchema = new mongoose_1.Schema({
    friendId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Friend",
        required: true,
    }, // kon friend er jonno
    name: { type: String, required: true }, // friend name
    date: { type: Date, required: true }, // friend birthday
    ref: { type: String, required: true }, // owner user email
    remain: { type: Number, required: true }, // days until birthday
    isRead: { type: Boolean, default: false }, // user read/unread
    createdAt: { type: Date, default: Date.now },
}, { timestamps: true });
exports.FriendModel = (0, mongoose_1.model)("notification", NotificationSchema);
