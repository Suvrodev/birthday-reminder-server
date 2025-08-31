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
exports.FriendGetServices = exports.getAllFriends = void 0;
const friend_model_1 = require("./friend.model");
const getDaysUntilBirthday_1 = require("./getDaysUntilBirthday");
const getAllFriends = (_a) => __awaiter(void 0, [_a], void 0, function* ({ ref, name, sort = "asc", sortBy = "date", page = 1, limit = 10, }) {
    if (!ref) {
        return { success: false, message: "ref (email) is required" };
    }
    console.log("Limit: ", limit);
    const query = { ref };
    if (name) {
        // শুধু name এর শুরু অনুযায়ী match
        query.name = { $regex: `^${name}`, $options: "i" };
    }
    const skip = (page - 1) * limit;
    const sortOrder = sort === "asc" ? 1 : -1;
    // sortBy অনুযায়ী sort option
    const sortOption = {};
    sortOption[sortBy] = sortOrder;
    const friends = yield friend_model_1.FriendModel.find(query)
        .sort(sortOption)
        .skip(skip)
        .limit(limit)
        .select("name date photo ratting ref location phone");
    /**
     * Remaining Day start
     */
    const friendsWithRemain = friends.map((friend) => (Object.assign(Object.assign({}, friend.toObject()), { remain: (0, getDaysUntilBirthday_1.getDaysUntilBirthday)(friend.date) })));
    /**
     * Remaining Day end
     */
    const total = yield friend_model_1.FriendModel.countDocuments(query);
    const totalPages = Math.ceil(total / limit);
    return {
        success: true,
        data: friendsWithRemain,
        page,
        totalPages,
        total,
    };
});
exports.getAllFriends = getAllFriends;
exports.FriendGetServices = {
    getAllFriends: exports.getAllFriends,
};
