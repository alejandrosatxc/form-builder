import prisma from '../../../lib/prisma';
import { NextApiResponse, NextApiRequest } from 'next'
import { Form } from '@prisma/client';

async function PUT(req: NextApiRequest, res: NextApiResponse, formId: string) {

  const { content, title } = req.body

  const form = await prisma.form.update({
    where: {
      id: formId
    },
    data: {
      content: content,
      title: title
    }
  })

  return form
}

async function DELETE(formId: string) {

  const form = await prisma.form.delete({
    where: {
      id: formId
    }
  })

  return form
}

export default async function handler(req, res) {
  const { formId } = req.query

  //Check if a form with formId exists
  const prismaForm = await prisma.form.findUnique({ where: { id: formId } })
  if (!prismaForm) {
    res.status(404).json({ error: '404 did not find form in database' })
    return
  }

  let result: Form

  switch (req.method) {
    case 'GET':
      res.json(prismaForm)
      return
    case 'PUT':
      result = await PUT(req, res, formId)
      res.json(result)
      return
    case 'DELETE':
      result = await DELETE(formId)
      res.json(result)
      return
    default:
      res.status(501).json({ error: 'Can not handle this request' })
  }

}