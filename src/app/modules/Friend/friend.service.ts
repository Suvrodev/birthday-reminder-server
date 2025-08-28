import { SortOrder } from "mongoose";
import AppError from "../../errors/AppError";
import { FriendModel } from "./friend.model";
import { TFriend } from "./friend.interface";
// Create Friend
const createFriendIntoDB = async (friendData: TFriend) => {
  console.log("In friend service: ------------", friendData);
  const result = await FriendModel.create(friendData);
  return result;
};

// Get Single Friend
const getSingleFriendFromDB = async (_id: string) => {
  try {
    const result = await FriendModel.findById({ _id });
    return result;
  } catch (error) {
    throw new Error("Friend Not Found");
  }
};

// Delete Friend
const deleteFriendFromDB = async (friendId: string) => {
  const result = await FriendModel.findByIdAndDelete({ _id: friendId });
  return result;
};

// Update Friend
const updateFriendFromDB = async (friendId: string, friendData: TFriend) => {
  console.log("friend id:", friendId);
  console.log("Update Data: ", friendData);
  const result = await FriendModel.findByIdAndUpdate(
    { _id: friendId },
    friendData,
    { new: true }
  );
  return result;
};

export const FriendServices = {
  createFriendIntoDB,
  getSingleFriendFromDB,
  deleteFriendFromDB,
  updateFriendFromDB,
};
