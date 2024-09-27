import dbConnect from "@/lib/dbConnect";
import Listing from "@/models/Listing";

export default async function getListings() {
  try {
    await dbConnect();
    const listings = await Listing.find().sort({ createdAt: -1 });
    console.log(listings);
    return listings;
  } catch (error) {
    console.log(error);
  }
}
