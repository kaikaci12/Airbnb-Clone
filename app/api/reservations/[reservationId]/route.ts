import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import Reservation from "@/models/Reservation";
interface IParams {
  reservationId: string;
}
export async function DELETE(req: Request, { params }: IParams) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.error();
  }
  const { reservationId } = params;
  if (!reservationId || typeof reservationId !== "string") {
    throw new Error("Invalid reservation ID");
  }
  const reservation = await Reservation.deleteMany({
    _id: reservationId,
    $or: [{ userId: currentUser._id }, { "listingId.userId": currentUser._id }],
  });
  return NextResponse.json(reservation);
}
