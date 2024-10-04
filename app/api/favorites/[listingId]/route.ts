import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
//Fix later
interface IParams {
  listingId?: string;
}

export async function POST(req: Request, { params }: { params: IParams }) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.error();
    }

    const { listingId } = params;
    if (!listingId || typeof listingId !== "string") {
      return NextResponse.json({ error: "Invalid id" }, { status: 400 });
    }

    await dbConnect();

    const updatedUser = await User.findByIdAndUpdate(
      currentUser._id,
      { $addToSet: { favoriteIds: listingId } },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

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

  // Connect to the database
  await dbConnect();

  const updatedUser = await User.findByIdAndUpdate(
    currentUser._id,
    { $pull: { favoriteIds: listingId } },
    { new: true } // Return the updated document
  );

  // Optionally return the updated user or some response
  if (!updatedUser) {
    return NextResponse.error(); // Handle the case where user is not found
  }

  return NextResponse.json(updatedUser);
}
