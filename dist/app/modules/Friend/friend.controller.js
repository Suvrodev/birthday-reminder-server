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
exports.FriendControllers = void 0;
const friend_galleryService_1 = require("./friend.galleryService");
const friend_getService_Rem_1 = require("./friend.getService_Rem");
const friend_service_1 = require("./friend.service");
const friend_getService_1 = require("./friend.getService");
// Create Friend
const createFriend = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const friend = req.body;
        console.log("Friend: ", friend);
        // Call service function to save data in DB
        const result = yield friend_service_1.FriendServices.createFriendIntoDB(friend);
        res.status(200).json({
            message: "Friend added successfully",
            success: true,
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
// Get All Friends With Remaining
const getAllFriends = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("COme: ");
    try {
        const { ref, search, sort, sortBy, page, limit } = req.query;
        if (!ref || typeof ref !== "string") {
            res.status(400).json({ success: false, message: "ref is required" });
            return;
        }
        const result = yield friend_getService_Rem_1.FriendGetServices_Rem.getAllFriends({
            ref,
            name: typeof search === "string" ? search : undefined,
            sort: sort === "asc" || sort === "desc" ? sort : "asc",
            sortBy: sortBy === "name" || sortBy === "date" ? sortBy : "date",
            page: page ? Number(page) : 1,
            limit: limit ? Number(limit) : 10,
        });
        res.status(200).json({
            message: "Friends retrieved successfully",
            success: true,
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
// Get All Friends With Remaining Sort
const getAllFriendsWithRemainSort = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { ref, search, page, limit } = req.query;
        if (!ref || typeof ref !== "string") {
            res.status(400).json({ success: false, message: "ref is required" });
            return;
        }
        const result = yield friend_getService_1.FriendGetServices_RemSort.getAllFriends({
            ref,
            search: typeof search === "string" ? search : undefined,
            page: page && !isNaN(Number(page)) ? Number(page) : 1,
            limit: limit && !isNaN(Number(limit)) ? Number(limit) : 10,
        });
        res.status(200).json(result);
    }
    catch (error) {
        console.error("Error fetching friends (remain sort):", error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
});
// Get All Friend Photos (pagination only)
const getAllFriendPhotos = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { ref, page, limit } = req.query;
        if (!ref || typeof ref !== "string") {
            res.status(400).json({ success: false, message: "ref is required" });
            return;
        }
        const result = yield friend_galleryService_1.FriendsGalleryService.getAllFriendPhotos({
            ref,
            page: page ? Number(page) : 1,
            limit: limit ? Number(limit) : 10,
        });
        res.status(200).json({
            message: "Friend photos retrieved successfully",
            success: true,
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
// Get Single Friend
const getSingleFriend = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const friendId = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.friendId;
        const result = yield friend_service_1.FriendServices.getSingleFriendFromDB(friendId);
        res.status(200).json({
            message: "Friend retrieved successfully",
            success: true,
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
// Delete Friend
const deleteFriend = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const friendId = req.params.friendId;
        console.log("Friend id for delete: ", friendId);
        const result = yield friend_service_1.FriendServices.deleteFriendFromDB(friendId);
        res.status(200).json({
            message: "Friend deleted successfully",
            success: true,
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
// Update Friend
const updateFriend = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const friendId = req.params.friendId;
        const friendBody = req === null || req === void 0 ? void 0 : req.body;
        const result = yield friend_service_1.FriendServices.updateFriendFromDB(friendId, friendBody);
        res.status(200).json({
            message: "Friend updated successfully",
            success: true,
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.FriendControllers = {
    createFriend,
    getAllFriends,
    getAllFriendPhotos,
    getAllFriendsWithRemainSort,
    getSingleFriend,
    deleteFriend,
    updateFriend,
};
