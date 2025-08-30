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
exports.FriendServices = void 0;
const friend_model_1 = require("./friend.model");
// Create Friend
const createFriendIntoDB = (friendData) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("In friend service: ------------", friendData);
    const result = yield friend_model_1.FriendModel.create(friendData);
    return result;
});
// Get Single Friend
const getSingleFriendFromDB = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield friend_model_1.FriendModel.findById({ _id });
        return result;
    }
    catch (error) {
        throw new Error("Friend Not Found");
    }
});
// Delete Friend
const deleteFriendFromDB = (friendId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield friend_model_1.FriendModel.findByIdAndDelete({ _id: friendId });
    return result;
});
// Update Friend
const updateFriendFromDB = (friendId, friendData) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("friend idd:", friendId);
    console.log("Update Dataaa: ", friendData);
    const result = yield friend_model_1.FriendModel.findOneAndUpdate({ _id: friendId }, { $set: friendData }, {
        new: true,
    });
    return result;
});
exports.FriendServices = {
    createFriendIntoDB,
    getSingleFriendFromDB,
    deleteFriendFromDB,
    updateFriendFromDB,
};
