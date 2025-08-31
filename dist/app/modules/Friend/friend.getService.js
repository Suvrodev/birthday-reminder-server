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
exports.FriendGetServices_RemSort = void 0;
const friend_model_1 = require("./friend.model");
const getDaysUntilBirthday_1 = require("./getDaysUntilBirthday");
const getAllFriends = (_a) => __awaiter(void 0, [_a], void 0, function* ({ ref, search, page = 1, limit = 10, }) {
    if (!ref) {
        return { success: false, message: "ref (email) is required" };
    }
    const query = { ref };
    if (search) {
        // query.name = { $regex: `^${name}`, $options: "i" };
        query.name = { $regex: search, $options: "i" }; // ^ remove
    }
    // 1️⃣ Sob friends niye aso (limit + skip pore apply)
    const allFriends = yield friend_model_1.FriendModel.find(query).select("name date ref  ");
    // 2️⃣ remain calculate
    const friendsWithRemain = allFriends.map((friend) => (Object.assign(Object.assign({}, friend.toObject()), { remain: (0, getDaysUntilBirthday_1.getDaysUntilBirthday)(friend.date) })));
    // 3️⃣ remain ascending sort
    const sortedFriends = friendsWithRemain.sort((a, b) => a.remain - b.remain);
    // 4️⃣ pagination slice
    const total = sortedFriends.length;
    const totalPages = Math.ceil(total / limit);
    const paginatedData = sortedFriends.slice((page - 1) * limit, page * limit);
    return {
        success: true,
        data: paginatedData,
        page,
        totalPages,
        total,
    };
});
exports.FriendGetServices_RemSort = {
    getAllFriends, // ✅ standard maintained
};
