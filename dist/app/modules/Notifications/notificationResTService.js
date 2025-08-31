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
exports.NotificationRestService = void 0;
const notification_model_1 = require("./notification.model");
// Get Single Friend
const getNotificationFromDB = (ref) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield notification_model_1.NotificationModel.find({ ref })
            .sort({ createdAt: -1 })
            .limit(50);
        return result;
    }
    catch (error) {
        throw new Error("Notification Not Found");
    }
});
// Delete Friend
// const deleteFriendFromDB = async (friendId: string) => {
//   const result = await FriendModel.findByIdAndDelete({ _id: friendId });
//   return result;
// };
// Update Friend
const updateNotificationFromDB = (notificationId) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Notification id:", notificationId);
    const result = yield notification_model_1.NotificationModel.findOneAndUpdate({ _id: notificationId }, { $set: { isRead: "true" } }, {
        new: true,
    });
    return result;
});
exports.NotificationRestService = {
    getNotificationFromDB,
    updateNotificationFromDB,
};
