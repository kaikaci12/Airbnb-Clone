import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";

export async function getSession() {
  return await getServerSession(authOptions);
}

export default async function getCurrentUser() {
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
    const safeCurrentUser = {
      ...currentUser,
      _id: currentUser._id.toString(),
      createdAt: currentUser.createdAt.toISOString(),
      updatedAt: currentUser.updatedAt.toISOString(),
      emailVerified: currentUser.emailVerified?.toISOString(),
    };
    return safeCurrentUser;
  } catch (error) {
    console.error("Error fetching current user:", error);
    return null; // Ensure you return null on error
  }
}
