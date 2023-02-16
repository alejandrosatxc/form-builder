import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { type TokenSet } from "@auth/core/types"
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
                params: { 
                    access_type: "offline", 
                    prompt: "consent",
                    scope: 'openid email profile https://www.googleapis.com/auth/documents https://www.googleapis.com/auth/documents.readonly' 
                }
            }
        }),

        // ...add more providers here
    ],

    callbacks: {
        async session({ session, user }) {

            //Implement refresh tokens
            const [google] = await prisma.account.findMany({
              where: { userId: user.id, provider: "google" },
            })
            if (google.expires_at < Date.now()) {
              // If the access token has expired, try to refresh it
              try {
                // https://accounts.google.com/.well-known/openid-configuration
                // We need the `token_endpoint`.
                const response = await fetch("https://oauth2.googleapis.com/token", {
                  headers: { "Content-Type": "application/x-www-form-urlencoded" },
                  body: new URLSearchParams({
                    client_id: process.env.GOOGLE_ID,
                    client_secret: process.env.GOOGLE_SECRET,
                    grant_type: "refresh_token",
                    refresh_token: google.refresh_token,
                  }),
                  method: "POST",
                })
      
                const tokens: TokenSet = await response.json()
      
                if (!response.ok) throw tokens
      
                await prisma.account.update({
                  data: {
                    access_token: tokens.access_token,
                    expires_at: (Math.ceil(Date.now() / 1000)) + tokens.expires_in,
                    refresh_token: tokens.refresh_token ?? google.refresh_token,
                  },
                  where: {
                    provider_providerAccountId: {
                      provider: "google",
                      providerAccountId: google.providerAccountId,
                    },
                  },
                })
              } catch (error) {
                console.error("Error refreshing access token", error)
                // The error property will be used client-side to handle the refresh token error
                session.error = "RefreshAccessTokenError"
              }
            }
            return session
          },
    }
}
export default NextAuth(authOptions)

