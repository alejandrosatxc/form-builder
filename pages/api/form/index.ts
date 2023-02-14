import { getToken } from "next-auth/jwt"
import prisma from '../../../lib/prisma';

// POST /api/form
// Required fields in body: title
// Optional fields in body: content
export default async function handler(req, res) {
  const { title, content } = req.body;
  //console.log(req.body)

  const token = await getToken({ req });
  const result = await prisma.form.create({
    data: {
      title: title,
      content: content,
      user: { connect: { email: token?.email } },
    },
  });
  res.json(result);
}