import { FriendModel } from "./friend.model";
import { getDaysUntilBirthday } from "./getDaysUntilBirthday";

interface GetAllFriendsParams {
  ref: string;
  search?: string;
  page?: number;
  limit?: number;
}

const getAllFriends = async ({
  ref,
  search,
  page = 1,
  limit = 10,
}: GetAllFriendsParams) => {
  if (!ref) {
    return { success: false, message: "ref (email) is required" };
  }

  const query: any = { ref };
  if (search) {
    // query.name = { $regex: `^${name}`, $options: "i" };
    query.name = { $regex: search, $options: "i" }; // ^ remove
  }

  // 1️⃣ Sob friends niye aso (limit + skip pore apply)
  const allFriends = await FriendModel.find(query).select(
    "name date photo ratting ref location phone"
  );

  // 2️⃣ remain calculate
  const friendsWithRemain = allFriends.map((friend) => ({
    ...friend.toObject(),
    remain: getDaysUntilBirthday(friend.date),
  }));

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
};

export const FriendGetServices_RemSort = {
  getAllFriends, // ✅ standard maintained
};
