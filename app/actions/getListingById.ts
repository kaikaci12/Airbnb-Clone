import dbConnect from "@/lib/dbConnect";
import Listing from "@/models/Listing";

interface IParams {
  listingId?: string;
}

export default async function getListingById(params: IParams) {
  try {
    const { listingId } = params;

    if (!listingId) {
      throw new Error("Listing ID is required");
    }

    // Connect to the database
    await dbConnect();

    // Find the listing by ID, populate the associated user
    const listing = await Listing.findById(listingId).populate("userId");

    if (!listing) {
      return null; // Return null if no listing found
    }
    console.log(listing);
    // Safely return the listing details
    return {
      id: listing._id.toString(),
      title: listing.title,
      description: listing.description,
      imageSrc: listing.imageSrc,
      category: listing.category,
      roomCount: listing.roomCount,
      bathroomCount: listing.bathroomCount,
      guestCount: listing.guestCount,
      locationValue: listing.locationValue,
      price: listing.price,
      createdAt: listing.createdAt ? listing.createdAt.toISOString() : null,
      updatedAt: listing.updatedAt ? listing.updatedAt.toISOString() : null,
      userId: listing.userId ? listing.userId._id.toString() : null,
      user: {
        name: listing.userId ? listing.userId.name : null,
        email: listing.userId ? listing.userId.email : null,
        createdAt: listing.userId?.createdAt
          ? listing.userId.createdAt.toISOString()
          : null,
        updatedAt: listing.userId?.updatedAt
          ? listing.userId.updatedAt.toISOString()
          : null,
        emailVerified: listing.userId?.emailVerified
          ? listing.userId.emailVerified.toISOString()
          : null,
      },
    };
  } catch (error) {
    console.error("Error fetching listing:", error);
    return null; // Return null on error instead of throwing
  }
}
