import { getServerSession } from "next-auth/next"
import prisma from '../../../lib/prisma';
import { authOptions } from "../auth/[...nextauth]";

// POST /api/form
// Required fields in body: title
// Optional fields in body: content
export default async function handler(req, res) {

  //Get session cookie from request and fetch session information
  const session = await getServerSession(req, res, authOptions)

  //If there is no active session, send error
  if (!session) {
    res.status(401).json({ 'error': 'Unauthorized' })
    return
  }

  //Look up user details using the email in session object
  const prismaUser = prisma.user.findUnique({
    where: {
      email: session.user.email
    }
  })

  //If a user with that email doesnt exist, send error
  if (!prismaUser) {
    res.status(401).json({ 'error': 'Unauthorized, this user does not have an account' })
    return
  }

  //Handle POST Request
  if (req.method === "POST") {
    const { title, content } = req.body;

    const form = await prisma.form.create({
      data: {
        title: title,
        content: content,
        user: { connect: { email: session?.user.email } }, //assign a user to this new form based on the email in the session obj
      },
    });

    res.status(201).json(form);
    return
  }

  //Catch all
  res.status(401).json({ error: 'Unauthorized, wrong route, idk' })
  return
}