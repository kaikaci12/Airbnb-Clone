import dbConnect from "@/lib/dbConnect";
import Listing from "@/models/Listing";

export interface IListingParams {
  userId?: string;
  guestCount?: number;
  roomCount?: number;
  bathroomCount?: number;
  startDate?: string;
  endDate?: string;
  locationValue?: string;
  category?: string;
}

export default async function getListings(params: IListingParams) {
  try {
    const {
      userId,
      roomCount,
      guestCount,
      bathroomCount,
      locationValue,
      startDate,
      endDate,
      category,
    } = params;

    const query = {};

    if (userId) {
      query.userId = userId;
    }

    if (category) {
      query.category = category;
    }

    if (roomCount) {
      query.roomCount = {
        $gte: +roomCount,
      };
    }

    if (guestCount) {
      query.guestCount = {
        $gte: +guestCount,
      };
    }

    if (bathroomCount) {
      query.bathroomCount = {
        $gte: +bathroomCount,
      };
    }

    if (locationValue) {
      query.locationValue = locationValue;
    }

    if (startDate && endDate) {
      query.reservations = {
        $not: {
          $elemMatch: {
            $or: [
              { endDate: { $gte: startDate }, startDate: { $lte: startDate } },
              { startDate: { $lte: endDate }, endDate: { $gte: endDate } },
            ],
          },
        },
      };
    }

    await dbConnect();
    const listings = await Listing.find(query).sort({ createdAt: -1 }).lean();

    const safeListings = listings.map((list) => ({
      ...list,
      createdAt: list.createdAt.toISOString(),
    }));

    return safeListings;
  } catch (error) {
    console.log(error);
    return [];
  }
}
