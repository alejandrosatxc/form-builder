import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "../../../lib/prisma"
import { NextAuthOptions } from "next-auth"

export const authOptions : NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
            idToken: true,
            authorization: {
                url: 'https://accounts.google.com/o/oauth2/v2/auth',
                params: { scope: 'openid email profile https://www.googleapis.com/auth/documents https://www.googleapis.com/auth/documents.readonly' }
            }
        }),

        // ...add more providers here
    ],
}
export default NextAuth(authOptions)

