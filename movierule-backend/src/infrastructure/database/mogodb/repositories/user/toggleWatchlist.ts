import { User } from "../../models/userSchema";

export const toggleWatchlist = async (
  userId: string,
  movieId: string
): Promise<{
  success: boolean;
  inWatchlist?: boolean;
  watchlist?: string[];
}> => {
  const user = await User.findById(userId);
  if (!user) return { success: false };

  const movieIdStr = movieId.toString();

  // defensive: handle undefined
  const watchlist = user.watchlist || [];

  const isInList = watchlist.some((id: any) => id.toString() === movieIdStr);

  if (isInList) {
    user.watchlist = watchlist.filter(
      (id: any) => id.toString() !== movieIdStr
    );
  } else {
    // ✅ let Mongoose cast string → ObjectId automatically
    user.watchlist.push(movieId as any);
    // OR explicitly: user.watchlist.push(new Types.ObjectId(movieId) as any);
  }

  await user.save();

  return {
    success: true,
    inWatchlist: !isInList,
    watchlist: user.watchlist.map((id: any) => id.toString()),
  };
};
