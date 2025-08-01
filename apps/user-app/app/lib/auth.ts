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
          // TODO: User credentials type from next-aut
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

              if (existingUser) {
                const passwordValidation = await bcrypt.compare(credentials.password, existingUser.password);
                console.log("Password validation result:", passwordValidation);
                
                if (passwordValidation) {
                  return {
                    id: existingUser.id.toString(),
                    name: existingUser.name || credentials.phone,
                    email: existingUser.number
                  }
                }
                return null;
              }

              // If user doesn't exist, create a new one
              console.log("Creating new user");
              const hashedPassword = await bcrypt.hash(credentials.password, 10);
              const user = await db.user.create({
                data: {
                  number: credentials.phone,
                  name: credentials.phone, // Use phone as initial name
                  password: hashedPassword
                }
              });

              await db.balance.create({
                data: {
                  userId: user.id,
                  amount: 0,
                  locked: 0
                }
              });
          
              console.log("New user created successfully");
              return {
                id: user.id.toString(),
                name: user.name || credentials.phone,
                email: user.number
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
  