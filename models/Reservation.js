import mongoose from "mongoose";

const { Schema } = mongoose;

const reservationSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  listingId: { type: Schema.Types.ObjectId, ref: "Listing", required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  totalPrice: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Reservation =
  mongoose.models.Reservation ||
  mongoose.model("Reservation", reservationSchema);

export default Reservation;
