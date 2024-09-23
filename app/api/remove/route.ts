import { storage } from "@/firebase/firebase"; // Adjust the import path
import { ref, deleteObject } from "firebase/storage";
import { NextResponse } from "next/server";

export async function DELETE(req) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get("url");

  if (!url) {
    return NextResponse.json({ error: "No URL provided" }, { status: 400 });
  }

  // Decode the URL and extract the file path
  const decodedUrl = decodeURIComponent(url);
  const filePath = decodedUrl.split("/o/")[1].split("?")[0]; // Extract the file path from the URL

  const storageRef = ref(storage, filePath);

  try {
    await deleteObject(storageRef);
    return NextResponse.json(
      { message: "Image removed successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Firebase Remove Error: ", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
