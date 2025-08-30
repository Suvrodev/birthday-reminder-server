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
exports.FriendGetServices = exports.getAllFriendPhotos = void 0;
const friend_model_1 = require("./friend.model");
const getAllFriendPhotos = (_a) => __awaiter(void 0, [_a], void 0, function* ({ ref, page = 1, limit = 10, }) {
    if (!ref) {
        return { success: false, message: "ref (email) is required" };
    }
    const skip = (page - 1) * limit;
    // Sudhu photo field select korbo
    const photos = yield friend_model_1.FriendModel.find({ ref })
        .skip(skip)
        .limit(limit)
        .select("photo"); // ✅ just photo
    const total = yield friend_model_1.FriendModel.countDocuments({ ref });
    const totalPages = Math.ceil(total / limit);
    return {
        success: true,
        data: photos, // ekhane sudhu photo array thakbe
        page,
        totalPages,
        total,
    };
});
exports.getAllFriendPhotos = getAllFriendPhotos;
exports.FriendGetServices = {
    getAllFriendPhotos: exports.getAllFriendPhotos, // add this
};
