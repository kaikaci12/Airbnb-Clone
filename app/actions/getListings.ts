import dbConnect from "@/lib/dbConnect";
import Listing from "@/models/Listing";

export default async function getListings() {
  try {
    await dbConnect();
    const listings = await Listing.find().sort({ createdAt: -1 }).lean();

    const safeListings = listings.map((list) => ({
      ...list,
      createdAt: list.createdAt.toISOString(), // Convert Date to an ISO string
    }));
    return safeListings;
  } catch (error) {
    console.log(error);
    return []; // Return an empty array in case of error
  }
}
