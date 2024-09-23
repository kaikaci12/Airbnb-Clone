// pages/api/upload.js
import { storage } from "@/firebase/firebase"; // Adjust the import path
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import nextConnect from "next-connect";
import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() });

const apiRoute = nextConnect({
  onError(err, req, res) {
    res.status(501).json({ error: `Something went wrong! ${err.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: "Method not allowed" });
  },
});

apiRoute.use(upload.single("file"));

apiRoute.post(async (req, res) => {
  const file = req.file;
  const storageRef = ref(storage, `images/${file.originalname}`);

  try {
    await uploadBytes(storageRef, file.buffer);
    const downloadURL = await getDownloadURL(storageRef);
    res.status(200).json({ url: downloadURL });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default apiRoute;
export const config = {
  api: {
    bodyParser: false,
  },
};
