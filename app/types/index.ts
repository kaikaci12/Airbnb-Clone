import { UserType } from "@/models/User";
import { ReservationType } from "@/models/Reservation";
import { ListingType } from "@/models/Listing";

export type SafeListing = Omit<ListingType, "createdAt"> & {
  createdAt: string;
};

export type SafeReservation = Omit<
  ReservationType,
  "createdAt" | "startDate" | "endDate" | "listing"
> & {
  createdAt: string;
  startDate: string;
  endDate: string;
  listing: SafeListing;
};

export type SafeUser = Omit<
  UserType,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};
