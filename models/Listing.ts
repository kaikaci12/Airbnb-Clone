import mongoose from "mongoose";
const { Schema } = mongoose;
import { Types } from "mongoose";

// Interface for the Listing Schema
export interface ListingType {
  _id: string; // String-based _id
  title: string;
  description: string;
  imageSrc: string;
  createdAt?: Date; // Optional since default is Date.now
  category: string;
  roomCount: number;
  bathroomCount: number;
  guestCount: number;
  locationValue: string;
  userId: Types.ObjectId; // Reference to User model
  price: number;
}

const listingSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageSrc: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  category: { type: String, required: true },
  roomCount: { type: Number, required: true },
  bathroomCount: { type: Number, required: true },
  guestCount: { type: Number, required: true },
  locationValue: { type: String, required: true },
  userId: { type: String, ref: "User" },

  price: { type: Number, required: true },
});

listingSchema.virtual("reservations", {
  ref: "Reservation",
  localField: "_id",
  foreignField: "listingId",
});
listingSchema.set("toJSON", { virtuals: true });
listingSchema.set("toObject", { virtuals: true });

const Listing =
  mongoose.models.Listing || mongoose.model("Listing", listingSchema);

export default Listing;
