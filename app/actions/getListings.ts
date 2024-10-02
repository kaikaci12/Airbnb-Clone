import dbConnect from "@/lib/dbConnect";
import Listing from "@/models/Listing";
import { ListingType } from "@/models/Listing";

export default async function getListings(): Promise<ListingType[]> {
  try {
    await dbConnect();
    const listings = await Listing.find().sort({ createdAt: -1 }).lean();

    const safeListings = listings.map((list) => ({
      ...list,
      _id: list._id.toString(), // Ensure _id is a string
      createdAt: list.createdAt.toISOString(), // Convert to ISO string
    })) as (ListingType & { _id: string })[]; // Type assertion here

    return safeListings;
  } catch (error) {
    console.log(error);
    return []; // Return an empty array in case of error
  }
}
