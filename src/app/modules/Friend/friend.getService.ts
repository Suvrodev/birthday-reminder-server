import { SortOrder } from "mongoose";
import { FriendModel } from "./friend.model";

const getAllFriends = async ({
  name,
  sort = "asc",
  page = 1,
  limit = 10,
  ref,
}: {
  name?: string;
  sort?: "asc" | "desc";
  page?: number;
  limit?: number;
  ref?: string;
}) => {
  console.log(
    "===================================================================="
  );

  if (!ref) {
    return { success: false, message: "ref (email) is required" };
  }

  const query: any = { ref }; // ✅ Only filter by ref

  if (name) {
    query.name = { $regex: name, $options: "i" };
  }

  const skip = (page - 1) * limit;
  const sortOrder: SortOrder = sort === "asc" ? 1 : -1;
  const sortOption: { [key: string]: SortOrder } = { date: sortOrder };

  const friends = await FriendModel.find(query)
    .sort(sortOption)
    .skip(skip)
    .limit(limit)
    .select("name date photo ratting ref");

  const total = await FriendModel.countDocuments(query);
  const totalPages = Math.ceil(total / limit);

  return { success: true, data: friends, page, totalPages, total };
};

export const FriendGetServices = {
  getAllFriends,
};
