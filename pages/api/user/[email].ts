import prisma from '../../../lib/prisma';


export default async function handler(req, res) {
    const { email } = req.query

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