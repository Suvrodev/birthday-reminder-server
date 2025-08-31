import express from "express";

import auth from "../../middleware/auth";
import { FriendControllers } from "./friend.controller";

const router = express.Router();

//will call controller function
router.post("/", FriendControllers.createFriend);
router.get("/", FriendControllers.getAllFriends);
router.get("/remain", FriendControllers.getAllFriendsWithRemainSort);
router.get("/image", FriendControllers.getAllFriendPhotos);
router.get("/single/:friendId", FriendControllers.getSingleFriend);
router.delete("/delete/:friendId", FriendControllers.deleteFriend);
router.patch("/update/:friendId", FriendControllers.updateFriend);

export const FriendRoutes = router;
