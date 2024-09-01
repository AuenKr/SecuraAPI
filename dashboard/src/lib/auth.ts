import prisma from "@/db";
import { NextAuthOptions, Session } from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "GOOGLE_CLIENT_ID",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "GOOGLE_CLIENT_SECRET",
    }),
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
  }
}