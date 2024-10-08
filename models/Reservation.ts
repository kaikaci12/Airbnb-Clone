import mongoose from "mongoose";
import { Types } from "mongoose";
const { Schema } = mongoose;
import { InferSchemaType } from "mongoose";
const reservationSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  listingId: { type: Schema.Types.ObjectId, ref: "Listing", required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  totalPrice: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

reservationSchema.virtual("listing", {
  ref: "Listing", // Model to populate
  localField: "listingId", // The local field that contains the ObjectId for Listing
  foreignField: "_id", // The corresponding field in the Listing model
});
reservationSchema.set("toJSON", { virtuals: true });

const Reservation =
  mongoose.models.Reservation ||
  mongoose.model("Reservation", reservationSchema);
export interface ReservationType {
  _id: string; // Auto-generated ID by MongoDB
  userId: Types.ObjectId; // Reference to the User model
  listingId: Types.ObjectId; // Reference to the Listing model
  startDate: Date; // The start date of the reservation
  endDate: Date; // The end date of the reservation
  totalPrice: number; // Total price for the reservation
  createdAt?: Date; // Date when the reservation was created (optional, defaults to now)
}
export default Reservation;
