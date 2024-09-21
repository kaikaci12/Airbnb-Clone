import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect"; // Import your Mongoose connection
import getCurrentUser from "@/app/actions/getCurrentUser";
import Listing from "@/models/Listing";

export async function POST(req: Request) {
  // Get the current user and ensure it's awaited
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.error(); // You were checking the function instead of the result
  }

  // Await for the request body to be parsed
  const body = await req.json();
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

  // Connect to the database
  await dbConnect();

  // Create a new listing
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

  // Return the created listing
  return NextResponse.json(listing);
}
