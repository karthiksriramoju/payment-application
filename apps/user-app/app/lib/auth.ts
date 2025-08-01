import db from "@repo/db/client";
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt";
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";

export const authOptions = {
    providers: [
      CredentialsProvider({
          name: 'Credentials',
          credentials: {
            phone: { label: "Phone number", type: "text", placeholder: "1231231231", required: true },
            password: { label: "Password", type: "password", required: true }
          },
          async authorize(credentials: any) {
            console.log("Authorize called with credentials:", { phone: credentials?.phone, hasPassword: !!credentials?.password });
            
            if (!credentials?.phone || !credentials?.password) {
              console.log("Missing credentials");
              return null;
            }

            try {
              const existingUser = await db.user.findFirst({
                where: {
                  number: credentials.phone
                }
              });

              console.log("Existing user found:", !!existingUser);

              if (!existingUser) {
                console.log("User not found - sign up required");
                return null;
              }

              // Check if user has a password (should always have one)
              if (!existingUser.password) {
                console.log("User exists but has no password");
                return null;
              }

              console.log("Attempting password comparison...");
              console.log("Input password length:", credentials.password.length);
              console.log("Stored password hash length:", existingUser.password.length);

              // Compare passwords
              const passwordValidation = await bcrypt.compare(credentials.password, existingUser.password);
              console.log("Password validation result:", passwordValidation);
              
              if (passwordValidation) {
                console.log("Password validation successful - returning user");
                return {
                  id: existingUser.id.toString(),
                  name: existingUser.name || credentials.phone,
                  email: existingUser.number
                }
              } else {
                console.log("Password validation failed");
                return null;
              }
            } catch(e) {
              console.error('Error in authorize function:', e);
              return null;
            }
          },
        })
    ],
    secret: process.env.NEXTAUTH_SECRET || "secret",
    callbacks: {
        async jwt({ token, user }: { token: JWT; user: any }) {
            if (user) {
                token.id = user.id;
                token.name = user.name;
                token.email = user.email;
            }
            return token;
        },
        async session({ token, session }: { token: JWT; session: Session }) {
            if (session.user) {
                session.user.id = token.id;
                session.user.name = token.name;
                session.user.email = token.email;
            }
            return session;
        }
    },
    pages: {
      signIn: "/signin", // Path to the custom sign-in page
    },
  }
  