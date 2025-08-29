import { SortOrder } from "mongoose";
import { FriendModel } from "./friend.model";

interface GetAllFriendsParams {
  ref: string;
  name?: string;
  sort?: "asc" | "desc";
  sortBy?: "date" | "name" | "rating"; // ✅ rating add
  page?: number;
  limit?: number;
}

export const getAllFriends = async ({
  ref,
  name,
  sort = "asc",
  sortBy = "date",
  page = 1,
  limit = 10,
}: GetAllFriendsParams) => {
  if (!ref) {
    return { success: false, message: "ref (email) is required" };
  }

  const query: any = { ref };

  if (name) {
    // শুধু name এর শুরু অনুযায়ী match
    query.name = { $regex: `^${name}`, $options: "i" };
  }

  const skip = (page - 1) * limit;
  const sortOrder: SortOrder = sort === "asc" ? 1 : -1;

  // sortBy অনুযায়ী sort option
  const sortOption: { [key: string]: SortOrder } = {};
  sortOption[sortBy] = sortOrder;

  const friends = await FriendModel.find(query)
    .sort(sortOption)
    .skip(skip)
    .limit(limit)
    .select("name date photo ratting ref location phone");

  const total = await FriendModel.countDocuments(query);
  const totalPages = Math.ceil(total / limit);

  return {
    success: true,
    data: friends,
    page,
    totalPages,
    total,
  };
};

export const FriendGetServices = {
  getAllFriends,
};
