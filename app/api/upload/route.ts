import { storage } from "@/firebase/firebase"; // Adjust the import path
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { NextResponse } from "next/server";

export async function POST(req) {
  const formData = await req.formData(); // Get the form data from the request
  const file = formData.get("file"); // Extract the file

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  const storageRef = ref(storage, `images/${file.name}`);

  try {
    // Upload the file directly
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return NextResponse.json({ url: downloadURL }, { status: 200 });
  } catch (error) {
    console.error("Firebase Upload Error: ", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
