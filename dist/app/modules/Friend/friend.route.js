"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FriendRoutes = void 0;
const express_1 = __importDefault(require("express"));
const friend_controller_1 = require("./friend.controller");
const router = express_1.default.Router();
//will call controller function
router.post("/", friend_controller_1.FriendControllers.createFriend);
router.get("/", friend_controller_1.FriendControllers.getAllFriends);
router.get("/:id", friend_controller_1.FriendControllers.getSingleFriend);
router.delete("/:id", friend_controller_1.FriendControllers.deleteFriend);
router.patch("/update/:id", friend_controller_1.FriendControllers.updateFriend);
exports.FriendRoutes = router;
