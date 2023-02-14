import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { getToken } from "next-auth/jwt"
import { NextApiResponse, NextApiRequest } from 'next'
import getServerSession from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"
import prisma from '../../../lib/prisma';

// GET /api/user
export default async function handler(req : NextApiRequest, res: NextApiResponse) {

    // if (req.method === 'GET') {
    //     //const token = await getToken({ req });
    //     //const session = await getServerSession(req, res, authOptions)
    //     //console.log(session)
    //     const user = await prisma.user.findMany({
    //         where: {
    //             id: session?.userId,
    //             //id: token.idToken
    //         },
    //         include: {
    //             forms: true
    //         }
    //     })
    //     console.log(user)
    //     res.json(user);
    // }
    //console.log(req.body)

    res.json({ message: "this route cannot handle this request." })
}