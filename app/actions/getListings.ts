import dbConnect from "@/lib/dbConnect";
import Listing from "@/models/Listing";
export interface IListingParams {
  userId?: string;
}
export default async function getListings(params: IListingParams) {
  try {
    const { userId } = params;
    let query: any = {};
    if (userId) {
      query.userId = userId;
    }

    await dbConnect();
    const listings = await Listing.find(query).sort({ createdAt: -1 }).lean();

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
