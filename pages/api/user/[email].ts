import prisma from '../../../lib/prisma';
import { NextApiResponse, NextApiRequest } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { email } = req.body

    const result = await prisma.user.findUnique({
      where: {
        email: email
      },
      include: {
        forms: true
      }
    })
    //console.log(result)
    res.json(result)
  }