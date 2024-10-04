import bcrypt from "bcrypt";
import dbConnect from "@/lib/dbConnect"; // Import your Mongoose connection
import { NextResponse } from "next/server";
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name, password } = body;

    // Ensure the Mongoose connection is established
    await dbConnect();

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);
    // Create a new user
    const user = await User.create({
      email,
      name,
      hashedPassword,
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error creating user" }, { status: 500 });
  }
}
