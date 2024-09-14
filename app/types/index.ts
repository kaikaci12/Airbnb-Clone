import { UserType } from "@/models/User";
export type SafeUser = Omit<
  UserType,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};
