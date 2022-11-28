import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
            idToken: true,
            authorization: {
                prompt: "consent",
                access_type: "offline",
                response_type: "code",
                url: 'https://accounts.google.com/o/oauth2/v2/auth',
                params: { scope: 'openid email profile https://www.googleapis.com/auth/documents https://www.googleapis.com/auth/documents.readonly'}
            }
        }),

        // ...add more providers here
    ],
    secret: process.env.JWT_SECRET,
    callbacks: {
        async jwt({ token, account, profile }) {
            // Persist the OAuth access_token to the token right after signin
            if (account) {
                token.accessToken = account.access_token
                token.idToken = profile.idToken
            }
            return token
        },
        async session({ session, token, profile, user }) {
            // Send properties to the client, like an access_token from a provider.
            session.accessToken = token.accessToken
            session.idToken = token.idToken
            return session
        }
    }

}
export default NextAuth(authOptions)

