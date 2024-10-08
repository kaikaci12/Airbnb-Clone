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
      .sort({ createdAt: -1 })
      .lean();

    await dbConnect();
    const reservations = await Reservation.find(query)
      .sort({ createdAt: -1 })
      .populate("listingId")
      .lean(); // Convert Mongoose documents to plain objects

    const safeReservations = reservations.map((reservation) => ({
      ...reservation,
      _id: reservation._id.toString(), // Convert ObjectId to string
      userId: reservation.userId.toString(), // Convert ObjectId to string
      listingId: reservation.listingId
        ? {
            ...reservation.listingId,
            _id: reservation.listingId._id.toString(), // Convert ObjectId to string
            createdAt: reservation.listingId.createdAt.toISOString(),
          }
        : null,
      createdAt: reservation.createdAt.toISOString(),
      startDate: reservation.startDate.toISOString(),
      endDate: reservation.endDate.toISOString(),
    }));
    console.log(reservation);
    return safeReservations;
  } catch (error) {
    console.log(error);
  }
}
