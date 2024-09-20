import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect"; // Import your Mongoose connection
import getCurrentUser from "@/app/actions/getCurrentUser";
import Listing from "@/models/Listing";
export async function POST(req: Request) {
  const currentUser = getCurrentUser();
  if (!getCurrentUser) {
    return NextResponse.error();
  }
  const body = req.json();
  const {
    title,
    description,
    imageSrc,
    category,
    roomCount,
    bathroomCount,
    guestCount,
    location,
    price,
  } = body;
  await dbConnect();
  const listing = await Listing.create({
    title,
    imageSrc,
    description,
    roomCount,
    bathroomCount,
    category,
    guestCount,
    locationValue: location.value,
    price: parseInt(price, 10),
    userId: currentUser.id,
  });
  return NextResponse.json(listing);
}
