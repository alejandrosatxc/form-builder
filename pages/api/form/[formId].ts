import prisma from '../../../lib/prisma';


export default async function handler(req, res) {
    const { formId } = req.query

    const result = await prisma.form.findUnique({
      where: {
        id: formId
      }
    })
    console.log(result)
    res.json(result)
  }