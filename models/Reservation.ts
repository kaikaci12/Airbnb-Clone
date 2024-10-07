import mongoose from "mongoose";

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

export type ReservationType = InferSchemaType<typeof reservationSchema>;
export default Reservation;
