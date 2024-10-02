import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { UserType } from "@/models/User";

export async function getSession() {
  return await getServerSession(authOptions);
}

export default async function getCurrentUser(): Promise<UserType | null> {
  try {
    await dbConnect();
    const session = await getSession();
    if (!session?.user?.email) {
      return null; // Handle absence of session properly
    }

    const currentUser = await User.findOne({
      email: session.user.email,
    }).lean();

    if (!currentUser) {
      return null; // Handle absence of user properly
    }

    return {
      ...currentUser,
      _id: currentUser._id.toString(), // Convert ObjectId to string
      createdAt: currentUser.createdAt.toISOString(), // Convert Date to ISO string
      updatedAt: currentUser.updatedAt.toISOString(), // Convert Date to ISO string
      emailVerified: currentUser.emailVerified?.toISOString() || null, // Optional
    } as UserType; // Type assertion here
  } catch (error) {
    console.error("Error fetching current user:", error);
    return null; // Ensure you return null on error
  }
}
