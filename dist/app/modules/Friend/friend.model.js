"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FriendModel = void 0;
const mongoose_1 = require("mongoose");
const friendSchema = new mongoose_1.Schema({
    name: { type: String, required: [true, "Name is required"], maxlength: 25 },
    date: { type: String, required: [true, "Date is required"] },
    photo: { type: String, required: [true, "Photo is required"] }, // base64 string
    ratting: { type: Number, required: [true, "Rating is required"] },
    phone: { type: String }, // optional
    location: { type: String }, // optional
    ref: { type: String, required: [true, "Ref is required"] },
}, { timestamps: true });
exports.FriendModel = (0, mongoose_1.model)("friends", friendSchema);
