import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { getToken } from "next-auth/jwt"
import prisma from '../../../lib/prisma';

// GET /api/user
export default async function handler(req, res) {

    if (req.method === 'GET') {
        const token = await getToken({ req });
        //console.log(token)
        const user = await prisma.user.findFirst({
            where: {
                email: token?.email
            },
            include: {
                forms: true
            }
        })
        //console.log(user)
        res.json(user);
    }
    //console.log(req.body)

    res.json({message: "this route cannot handle this request."})
}