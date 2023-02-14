import NextAuth from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
   interface Session { //interfaces can always be extended
    accessToken?: string
    idToken: string
  }
  interface Profile {
    idToken: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    idToken?: string 
    accessToken?: string
    id: string
    role: number
  }
}