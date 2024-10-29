import prisma from "@/db";
import * as bcrypt from 'bcrypt';
import { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "GOOGLE_CLIENT_ID",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "GOOGLE_CLIENT_SECRET",
    }),
    CredentialsProvider({
      name: 'Email',
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Enter email" },
        password: { label: "Password", type: "password", placeholder: "Enter password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password)
          return null;

        const user = await prisma.user.findFirst({
          where: {
            email: credentials.email
          }
        })

        const passCheckStatus = await bcrypt.compare(credentials.password, user?.password || "");
        if (passCheckStatus) {
          return user
        }
        return null;
      }
    })
  ],
  callbacks: {
    async signIn({ user }) {
      try {
        let result = await prisma.user.findFirst({
          where: {
            email: user.email || ""
          }
        })

        if (!result)
          result = await prisma.user.create({
            data: {
              email: user.email || "",
              name: user.name || "",
              profileImage: user.image || ""
            }
          })
        return true;
      } catch (error) {
        console.log(error)
        return false;
      }
    }
  },
  pages: {
    signIn: "/auth/signin",
    signOut: "/"
  }
}