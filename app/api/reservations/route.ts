import Listing from "@/models/Listing";
import Reservation from "@/models/Reservation";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { listingId, startDate, endDate, totalPrice } = body;

    if (!listingId || !startDate || !endDate || !totalPrice) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    await dbConnect();

    await Reservation.create({
      userId: currentUser._id,
      listingId,
      startDate,
      endDate,
      totalPrice,
    });

    const listing = await Listing.findById(listingId).populate("reservations");

    return NextResponse.json(listing, { status: 200 });
  } catch (error) {
    console.error("Error processing reservation:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error },
      { status: 500 }
    );
  }
}
