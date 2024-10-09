import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import Listing from "@/models/Listing";
interface IParams {
  listingId?: string;
}
export async function DELETE(req: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.error();
  }

  const { listingId } = params;

  if (!listingId || typeof listingId !== "string") {
    throw new Error("Invalid Id");
  }
  const listing = await Listing.deleteMany({
    _id: listingId,
    userId: currentUser._id,
  });
  return NextResponse.json(listing);
}
