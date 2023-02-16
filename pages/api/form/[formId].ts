import prisma from '../../../lib/prisma';

async function put(req, res, formId, content, title) {

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

export default async function handler(req, res) {
  const { formId } = req.query

  //Check if a form with formId exists
  const prismaForm = await prisma.form.findUnique({ where: { id: formId } })
  if (!prismaForm) {
    res.status(404).json({ error: '404 did not find form in database' })
    return
  }

  switch (req.method) {
    case 'GET':
      res.json(prismaForm)
      return
    case 'PUT':
      console.log("PUT*************")
      const { content, title } = req.body
      console.log(content)
      const result = await put(req, res, formId, content, title)
      console.log(result)
      res.json(result)
      return
    default:
      res.status(501).json({ error: 'Can not handle this request' })
  }

}