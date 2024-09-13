import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/user";
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

    const currentUser = await User.findOne({ email: session.user.email });
    if (!currentUser) {
      return null;
    }
    return currentUser;
  } catch (e) {
    return null;
  }
}
