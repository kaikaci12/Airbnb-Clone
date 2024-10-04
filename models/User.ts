import mongoose, { Schema } from "mongoose";
import { Types } from "mongoose";
const userSchema = new Schema(
  {
    name: { type: String, required: false },
    email: { type: String, unique: true, required: false },
    emailVerified: { type: Date, required: false },
    image: { type: String, required: false },
    hashedPassword: { type: String, required: false },
    favoriteIds: [{ type: String }], // Change this to String
    accounts: [{ type: Schema.Types.ObjectId, ref: "Account" }],
    listings: [{ type: Schema.Types.ObjectId, ref: "Listing" }],
    reservations: [{ type: Schema.Types.ObjectId, ref: "Reservation" }],
  },
  {
    timestamps: true, // Automatically handles `createdAt` and `updatedAt`
  }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

// Infer the TypeScript type from the schema
export type UserType = {
  _id: string; // String-based _id
  name?: string;
  email?: string;
  emailVerified?: Date;
  image?: string;
  hashedPassword?: string;
  favoriteIds?: string[]; // Array of string IDs
  accounts?: Types.ObjectId[]; // Array of Mongoose ObjectIds referencing "Account"
  listings?: Types.ObjectId[]; // Array of Mongoose ObjectIds referencing "Listing"
  reservations?: Types.ObjectId[]; // Array of Mongoose ObjectIds referencing "Reservation"
  createdAt?: Date;
  updatedAt?: Date;
};

export default User;
