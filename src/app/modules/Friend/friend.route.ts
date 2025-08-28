import express from "express";

import auth from "../../middleware/auth";
import { FriendControllers } from "./friend.controller";

const router = express.Router();

//will call controller function
router.post("/", FriendControllers.createFriend);
router.get("/", FriendControllers.getAllFriends);
router.get("/:id", FriendControllers.getSingleFriend);
router.delete("/:id", FriendControllers.deleteFriend);
router.patch("/update/:id", FriendControllers.updateFriend);

export const FriendRoutes = router;
