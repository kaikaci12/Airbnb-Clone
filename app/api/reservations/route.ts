import User from "@/models/User";
import Listing from "@/models/Listing";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";

export default async function POST(req: Request) {
  // Get the current user
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.error();
  }

  // Parse the request body
  const body = await req.json();
  const { listingId, startDate, endDate, totalPrice } = body;

  if (!listingId || !startDate || !endDate || !totalPrice) {
    return NextResponse.error();
  }

  await dbConnect();

  const listingAndReservation = await Listing.findByIdAndUpdate(
    listingId,
    {
      $push: {
        reservations: {
          userId: currentUser._id,
          startDate,
          endDate,
          totalPrice,
        },
      },
    },
    { new: true }
  );

  if (!listingAndReservation) {
    return NextResponse.error();
  }

  return NextResponse.json(listingAndReservation);
}
