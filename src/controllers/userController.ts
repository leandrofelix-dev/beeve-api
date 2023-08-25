import { Request, Response } from 'express'
import { prisma } from '../app'
import Log from '../utils/logger'

export async function createUser(req: Request, res: Response) {
  const data = req.body
  const {
    firstName,
    lastName,
    age,
    email,
    password,
    passwordConfirmation,
    isLinkedToIfce,
    studentCode,
    course,
    semester,
  } = data

  const requestedEmail = await prisma.user.findMany({ where: { email } })
  const requestedStudentCode = await prisma.user.findMany({
    where: { studentCode },
  })

  const alreadyExistEmail =
    requestedEmail.filter((user) => user.email === email).length !== 0

  const alreadyExistStudentCode =
    requestedStudentCode.filter((user) => user.studentCode === studentCode)
      .length !== 0

  if (alreadyExistEmail) {
    return res.status(400).json({ error: 'email already exists' })
  }
  if (studentCode) {
    if (alreadyExistStudentCode) {
      return res.status(400).json({ error: 'student code already exists' })
    }
  }
  if (password !== passwordConfirmation) {
    return res.status(400).json({ error: 'passwords do not match' })
  }

  try {
    const event = await prisma.user.create({
      data: {
        firstName,
        lastName,
        age,
        email,
        password,
        isLinkedToIfce,
        studentCode,
        course,
        semester,
      },
    })
    Log.info(`event created: ${event}`)
    return res.status(201).json({ created: event })
  } catch (e: any) {
    Log.error(`error: ${e.message}`)
  }
}

export async function deleteUser(req: Request, res: Response) {
  const id = req.params.id
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  })
  if (!user) {
    return res.status(404).json({ msg: 'user not found' })
  }
  try {
    const deletedUser = await prisma.user.delete({ where: { id } })
    Log.info(`user ${id} was be deleted`)
    return res.status(201).json({ deleted: deletedUser })
  } catch (e: any) {
    Log.error(`error: ${e.message}`)
  }
}

export async function editUser(req: Request, res: Response) {
  const id = req.params.id
  const data = req.body
  try {
    const user = await prisma.user.findMany({ where: { id } })
    if (user.length === 0) {
      return res.status(404).json({ msg: 'user not found' })
    }
    const updatedUser = await prisma.user.update({ where: { id }, data })

    Log.info(`user ${id} was be updated`)
    return res.status(200).json({ updated: updatedUser })
  } catch (err: any) {
    Log.error(`error: ${err.message}`)
    return res.status(500).json({ error: 'internal server error' })
  }
}
