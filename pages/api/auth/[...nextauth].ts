import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcrypt";
import dbConnect from "@/lib/dbConnect"; // Ensure your Mongoose connection is established
import User from "@/models/User"; // Import your Mongoose User model
import Account from "@/models/Account"; // Import your Mongoose Account model

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        await dbConnect(); // Ensure the Mongoose connection is established

        const user = await User.findOne({ email: credentials.email }).exec();

        if (!user || !user.hashedPassword) {
          throw new Error("Invalid credentials");
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );
        if (!isCorrectPassword) {
          throw new Error("Invalid credentials");
        }

        return user;
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      await dbConnect(); // Ensure Mongoose connection

      let existingUser = await User.findOne({ email: user.email });

      if (!existingUser) {
        // If user does not exist, create a new one in the database
        existingUser = await User.create({
          email: user.email,
          name: user.name || profile?.name,
          image: user.image || profile?.avatar_url,
        });
      }

      // Create or update the account in the database
      await Account.findOneAndUpdate(
        {
          provider: account?.provider,
          providerAccountId: account?.providerAccountId,
        },
        {
          userId: existingUser._id,
          provider: account?.provider,
          providerAccountId: account?.providerAccountId,
          access_token: account?.access_token,
          refresh_token: account?.refresh_token,
          expires_at: account?.expires_at,
          token_type: account?.token_type,
          scope: account?.scope,
          id_token: account?.id_token,
          session_state: account?.session_state,
        },
        { upsert: true, new: true }
      );

      return true; // Continue with sign in
    },
    async jwt({ token, user }) {
      // Attach user ID to the JWT token
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      // Append user ID to the session
      if (token?.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
  pages: {
    signIn: "/",
  },
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
