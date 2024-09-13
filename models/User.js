import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: false },
  email: { type: String, unique: true, required: false },
  emailVerified: { type: Date, required: false },
  image: { type: String, required: false },
  hashedPassword: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now, immutable: true },
  favoriteIds: [{ type: Schema.Types.ObjectId, ref: "Listing" }],
  accounts: [{ type: Schema.Types.ObjectId, ref: "Account" }],
  listings: [{ type: Schema.Types.ObjectId, ref: "Listing" }],
  reservations: [{ type: Schema.Types.ObjectId, ref: "Reservation" }],
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
