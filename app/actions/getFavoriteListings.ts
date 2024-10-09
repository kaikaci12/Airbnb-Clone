import Listing, { ListingType } from "@/models/Listing";
import dbConnect from "@/lib/dbConnect";
import getCurrentUser from "./getCurrentUser";
import { SafeListing, SafeUser } from "../types";

export default async function getFavoriteListings() {
  try {
    const currentUser: SafeUser = await getCurrentUser();

    if (!currentUser) {
      return [];
    }

    await dbConnect();

    const favorites = await Listing.find({
      _id: { $in: currentUser.favoriteIds || [] },
    }).lean();

    return favorites.map((favorite) => ({
      ...favorite,
      createdAt: favorite.createdAt.toString(),
    }));
  } catch (e) {
    console.error("Error fetching favorite listings:", e);
    throw new Error("Error fetching favorite listings");
  }
}
