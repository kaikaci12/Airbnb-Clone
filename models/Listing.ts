import mongoose from "mongoose";
const { Schema } = mongoose;
import { InferSchemaType } from "mongoose";

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
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  price: { type: Number, required: true },
});

listingSchema.virtual("reservations", {
  ref: "Reservation",
  localField: "_id",
  foreignField: "listingId",
});
export type ListingType = InferSchemaType<typeof listingSchema>;
const Listing =
  mongoose.models.Listing || mongoose.model("Listing", listingSchema);

export default Listing;
