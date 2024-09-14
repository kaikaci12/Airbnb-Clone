import mongoose, { Schema, InferSchemaType } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, required: false },
    email: { type: String, unique: true, required: false },
    emailVerified: { type: Date, required: false },
    image: { type: String, required: false },
    hashedPassword: { type: String, required: false },
    favoriteIds: [{ type: Schema.Types.ObjectId, ref: "Listing" }],
    accounts: [{ type: Schema.Types.ObjectId, ref: "Account" }],
    listings: [{ type: Schema.Types.ObjectId, ref: "Listing" }],
    reservations: [{ type: Schema.Types.ObjectId, ref: "Reservation" }],
  },
  {
    timestamps: true, // Automatically handles `createdAt` and `updatedAt`
  }
);

// Define the Mongoose model
const User = mongoose.models.User || mongoose.model("User", userSchema);

// Infer the TypeScript type from the schema
export type UserType = InferSchemaType<typeof userSchema>;

// Export both the model and the inferred type
export default User;
