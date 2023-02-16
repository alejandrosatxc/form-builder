import { NextApiResponse, NextApiRequest } from 'next'
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"
import prisma from '../../../lib/prisma';

// GET /api/user
//Get an access_token for a users provider
export default async function handler(req : NextApiRequest, res: NextApiResponse) {

    if (req.method === 'GET') {
        //Check for active session
        const session = await getServerSession(req, res, authOptions)
        if(!session) {
            res.status(401).json({error: 'Unauthorized'})
            return
        }

        //Get a user and thier accounts, account holds the access_token (next-auth providers: Google, Apple etc)
        const prismaUser = await prisma.user.findUnique({
            where: {
                email: session.user.email
            },
            include: {
                accounts: true,
            }
        })
        //Check if user exists
        if(!prismaUser) {
            res.status(401).json({error: 'Unauthorized, user not found'})
        }

        //Get the Google Provider access token
        const account = prismaUser.accounts.find(acc => acc.provider === "google")
        res.status(201).json(account.access_token);

        return
    }

    res.json({ message: "this route cannot handle this request." })
}