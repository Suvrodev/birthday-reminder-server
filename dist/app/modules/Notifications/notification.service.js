"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUpcomingBirthdayNotifications = void 0;
const getDaysUntilBirthday_1 = require("../Friend/getDaysUntilBirthday");
const friend_model_1 = require("../Friend/friend.model");
const notification_model_1 = require("./notification.model");
/**
 * Auto-create upcoming birthday notifications (remain <= 4 days)
 */
const createUpcomingBirthdayNotifications = () => __awaiter(void 0, void 0, void 0, function* () {
    const friends = yield friend_model_1.FriendModel.find();
    for (const friend of friends) {
        const dateStr = typeof friend.date === "string"
            ? friend.date
            : friend.date instanceof Date
                ? friend.date.toISOString()
                : new Date(friend.date).toISOString();
        const remain = (0, getDaysUntilBirthday_1.getDaysUntilBirthday)(dateStr);
        if (remain <= 4) {
            // avoid duplicate notifications
            const existing = yield notification_model_1.NotificationModel.findOne({
                friendId: friend._id,
                ref: friend.ref,
                remain,
            });
            if (!existing) {
                yield notification_model_1.NotificationModel.create({
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
});
exports.createUpcomingBirthdayNotifications = createUpcomingBirthdayNotifications;
