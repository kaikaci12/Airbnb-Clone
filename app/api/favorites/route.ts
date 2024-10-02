import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";

interface IParams {
  listingId?: string;
}

export async function POST(req: Request, { params }: { params: IParams }) {
  try {
    // Get the current user
    const currentUser = await getCurrentUser();

    // Check if the user is authenticated
    if (!currentUser) {
      return NextResponse.error(); // You might want to return a specific status
    }

    // Extract and validate listingId from params
    const { listingId } = params;
    if (!listingId || typeof listingId !== "string") {
      return NextResponse.json({ error: "Invalid id" }, { status: 400 });
    }

    // Connect to the database
    await dbConnect();

    // Update the user's favoriteIds
    const updatedUser = await User.findByIdAndUpdate(
      currentUser._id,
      {
        $addToSet: { favoriteIds: listingId }, // Use $addToSet to avoid duplicates
      },
      { new: true } // Return the updated document
    );

    // Check if user was updated successfully
    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Return the updated user or success message
    return NextResponse.json(
      { message: "Favorite added", user: updatedUser },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error adding favorite:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
export async function DELETE(req: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.error(); // You might want to return a specific status
  }
  const { listingId } = params;
  if (!listingId || typeof listingId !== "string") {
    throw new Error("Invalid id");
  }
}
