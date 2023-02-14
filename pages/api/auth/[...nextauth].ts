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
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, account, profile }) {
            // Persist the OAuth access_token to the token right after signin
            if (account) {
                token.accessToken = account.access_token
                token.idToken = profile.idToken
            }
            return token
        },
        async session({ session, token }) {
            // Send properties to the client, like an access_token from a provider.
            session.accessToken = token.accessToken
            session.idToken = token.idToken
            //console.log(session)
            return session
        }
    }

}
export default NextAuth(authOptions)

