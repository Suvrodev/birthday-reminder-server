import { SortOrder } from "mongoose";
import { FriendModel } from "./friend.model";

interface GetFriendPhotosParams {
  ref: string;
  page?: number;
  limit?: number;
}

export const getAllFriendPhotos = async ({
  ref,
  page = 1,
  limit = 10,
}: GetFriendPhotosParams) => {
  if (!ref) {
    return { success: false, message: "ref (email) is required" };
  }

  const skip = (page - 1) * limit;

  // Sudhu photo field select korbo
  const photos = await FriendModel.find({ ref })
    .skip(skip)
    .limit(limit)
    .select("photo"); // ✅ just photo

  const total = await FriendModel.countDocuments({ ref });
  const totalPages = Math.ceil(total / limit);

  return {
    success: true,
    data: photos, // ekhane sudhu photo array thakbe
    page,
    totalPages,
    total,
  };
};

export const FriendsGalleryService = {
  getAllFriendPhotos, // add this
};
