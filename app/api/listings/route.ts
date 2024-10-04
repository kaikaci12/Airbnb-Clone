import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect"; // Import your Mongoose connection
import getCurrentUser from "@/app/actions/getCurrentUser";
import Listing from "@/models/Listing";
import User from "@/models/User"; // Import your User model

export async function POST(req: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.error();
  }

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

  await dbConnect();

  try {
    // Create the listing
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
      userId: currentUser._id,
    });

    // Update the user's listings array
    await User.findByIdAndUpdate(
      currentUser._id,
      { $push: { listings: listing } }, // Add the listing ID to the listings array
      { new: true } // Return the updated user document
    );

    return NextResponse.json(listing);
  } catch (error) {
    console.error("Error creating listing: ", error);
    return NextResponse.json(
      { error: "Failed to create listing" },
      { status: 500 }
    );
  }
}
