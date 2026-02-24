// infrastructure/database/mogodb/repositories/user/getWatchlist.ts
import { User } from "../../models/userSchema";

export const getWatchlist = async (userId: string) => {
  const user = await User.findById(userId).populate("watchlist");
  if (!user) return null;

  return user.watchlist; // populated movie docs
};
