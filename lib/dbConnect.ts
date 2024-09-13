import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

let cachedClient = global.mongoose;

if (!cachedClient) {
  cachedClient = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cachedClient.conn) {
    return cachedClient.conn;
  }

  if (!cachedClient.promise) {
    const opts = {
      bufferCommands: false,
    };

    cachedClient.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongooseInstance) => {
        return mongooseInstance;
      });
  }

  cachedClient.conn = await cachedClient.promise;
  return cachedClient.conn;
}

export default dbConnect;
