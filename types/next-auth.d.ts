import NextAuth from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session { //interfaces can always be extended
    accessToken?: string,
  }
  interface JWT {
    /** OpenID ID Token */
    accessToken?: string,
    idToken?: string
  }

  interface Profile {
    id: string
  }
}