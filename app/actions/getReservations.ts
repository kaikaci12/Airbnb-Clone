import dbConnect from "@/lib/dbConnect";
import Reservation from "@/models/Reservation";

interface IParams {
  listingId?: string;
  userId?: string;
  authorId?: string;
}
export default async function getReservations(params: IParams) {
  try {
    const { listingId, userId, authorId } = params;
    const query: any = {};
    if (listingId) {
      query.listingId = listingId;
    }
    if (userId) {
      query.userId = userId;
    }
    if (authorId) {
      query.listing = { userId: authorId };
    }
    await dbConnect();
    const reservation = await Reservation.find(query)
      .populate("listingId")
      .sort({ createdAt: -1 });
    console.log(reservation);
    const safeReservations = reservation.map((reservation) => ({
      ...reservation,
      createdAt: reservation.createdAt.toISOString(),
      startDate: reservation.startDate.toISOString(),
      endDate: reservation.endDate.toISOString(),
      listing: {
        ...reservation.listing,
        createdAt: reservation.listing.createdAt.toISOString(),
      },
    }));
    return safeReservations;
  } catch (error) {
    throw new Error(error);
  }
}
