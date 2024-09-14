import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import dbConnect from "@/lib/dbConnect";
import User, { UserType } from "@/models/User";

// Helper function to get the session
export async function getSession() {
  return await getServerSession(authOptions);
}

export default async function getCurrentUser() {
  try {
    await dbConnect();
    const session = await getSession();
    if (!session?.user?.email) {
      return null;
    }

    const currentUser: UserType = await User.findOne({
      email: session.user.email,
    }).lean();

    if (!currentUser) {
      return null;
    }

    // Ensure fields exist before using `.map()`
    const serializedUser = {
      ...currentUser,

      _id: currentUser._id.toString(), // Ensure ObjectId is converted
      favoriteIds: currentUser.favoriteIds
        ? currentUser.favoriteIds.map((id) => id.toString())
        : [], // Convert all ObjectIds to strings
      accounts: currentUser.accounts
        ? currentUser.accounts.map((id) => id.toString())
        : [], // Same for accounts
      listings: currentUser.listings
        ? currentUser.listings.map((id) => id.toString())
        : [], // Same for listings
      reservations: currentUser.reservations
        ? currentUser.reservations.map((id) => id.toString())
        : [], // Same for reservations
      createdAt: currentUser.createdAt.toISOString(), // Convert Date to ISO string
      updatedAt: currentUser.updatedAt.toISOString(), // Same for updatedAt
      emailVerified: currentUser.emailVerified
        ? currentUser.emailVerified.toISOString()
        : null, // Handle nullable dates
    };

    return serializedUser;
  } catch (error) {
    console.error("Error fetching current user:", error);
    return null;
  }
}
