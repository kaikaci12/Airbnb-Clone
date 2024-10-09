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

    await dbConnect();

    let reservations = await Reservation.find(query)
      .populate("listingId")
      .sort({ createdAt: -1 })
      .lean();

    if (authorId) {
      reservations = reservations.filter(
        (reservation) =>
          reservation.listingId && reservation.listingId.userId === authorId
      );
    }

    const safeReservations = reservations.map((reservation) => ({
      ...reservation,
      _id: reservation._id.toString(),
      userId: reservation.userId.toString(),
      listingId: reservation.listingId
        ? {
            ...reservation.listingId,
            _id: reservation.listingId._id.toString(),
            createdAt: reservation.listingId.createdAt.toISOString(),
          }
        : null,
      createdAt: reservation.createdAt.toISOString(),
      startDate: reservation.startDate.toISOString(),
      endDate: reservation.endDate.toISOString(),
    }));

    return safeReservations;
  } catch (error) {
    console.error("Error fetching reservations:", error);
    throw new Error("Error fetching reservations");
  }
}
