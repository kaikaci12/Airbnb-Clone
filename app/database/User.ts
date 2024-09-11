import mongoose from "mongoose";

// User Schema
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  emailVerified: {
    type: Date,
  },
  image: {
    type: String,
  },
  hashedPassword: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  favoriteIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
    },
  ],
  accounts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
    },
  ],
  listings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Listing",
    },
  ],
  reservations: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Reservation",
    },
  ],
});

// Account Schema
const AccountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  provider: {
    type: String,
    required: true,
  },
  providerAccountId: {
    type: String,
    required: true,
  },
  refresh_token: {
    type: String,
  },
  access_token: {
    type: String,
  },
  expires_at: {
    type: Number,
  },
  token_type: {
    type: String,
  },
  scope: {
    type: String,
  },
  id_token: {
    type: String,
  },
  session_state: {
    type: String,
  },
});

// Add unique index for provider and providerAccountId combination
AccountSchema.index({ provider: 1, providerAccountId: 1 }, { unique: true });

// Listing Schema
const ListingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageSrc: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  category: {
    type: String,
    required: true,
  },
  roomCount: {
    type: Number,
    required: true,
  },
  bathroomCount: {
    type: Number,
    required: true,
  },
  guestCount: {
    type: Number,
    required: true,
  },
  locationValue: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  reservations: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Reservation",
    },
  ],
});

// Reservation Schema
const ReservationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  listingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Listing",
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Export Models
export const User = mongoose.model("User", UserSchema);
export const Account = mongoose.model("Account", AccountSchema);
export const Listing = mongoose.model("Listing", ListingSchema);
export const Reservation = mongoose.model("Reservation", ReservationSchema);
