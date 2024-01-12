/* eslint-disable @typescript-eslint/no-explicit-any */

import { Request, Response } from 'express'
import { prisma } from '../../../config/prisma'
import { generateCode } from '../../data/utils/createEventCode'
import Log from '../../../config/logger'
import { AuthenticatedRequest } from '../middlewares/authMiddleware'
// import { createEventValidator } from '../middlewares/validateMiddleware'
import { UserLogged } from '../../../_shared/types'

export async function getEventByCode(req: Request, res: Response) {
  const eventCode = req.params.code
  try {
    const event = await prisma.event.findMany({
      where: { eventCode },
    })

    if (event.length === 0)
      return res.status(404).json({ error: 'invalid event code' })

    return res.status(200).json(event)
  } catch (err: any) {
    Log.error(`error: ${err.message}`)
  }
}

export async function getEventById(req: Request, res: Response) {
  const eventId = req.params.id
  try {
    const event = await prisma.event.findMany({
      where: { id: eventId },
    })
    if (event.length === 0) {
      return res.status(404).json({ error: 'invalid event id' })
    }
    return res.status(200).json(event)
  } catch (err: any) {
    Log.error(`error: ${err.message}`)
  }
}

export async function getAllEvents(req: Request, res: Response) {
  try {
    const event = await prisma.event.findMany()
    if (event.length === 0) {
      return res.status(404).json({ msg: 'no events found' })
    }
    return res.status(200).json(event)
  } catch (err: any) {
    Log.error(`error: ${err.message}`)
  }
}

export async function createEventController(
  req: AuthenticatedRequest,
  res: Response,
) {
  try {
    const { body } = req
    const { user } = req as UserLogged
    const { name, dateTime, location, description } = body
    const maxParticipants = Number(body.maxParticipants)
    const isPublic = Boolean(body.isPublic)
    const eventCode: string = await generateCode()

    const findUserById = await prisma.user.findUnique({
      where: { id: '77502e89-1904-4f51-baf0-654fc7fedc0d' },
    })
    console.log(user.userId)
    if (!findUserById) {
      return res.status(404).json({ error: 'Usuário não encontrado' })
    }

    const event = await prisma.event.create({
      data: {
        creator: { connect: { id: '77502e89-1904-4f51-baf0-654fc7fedc0d' } },
        name: 'name here teste',
        dateTime: new Date(),
        location: 'location here teste',
        description: 'description here teste',
        maxParticipants: 10,
        eventCode: '12312312312',
        isPublic: true,
      },
    })

    return res.status(201).json({ event })
  } catch (error: any) {
    // Log.error(`error: ${error.message}`)
    return res.status(500).json(error.message)
  }
}

export async function deleteEvent(req: Request, res: Response) {
  const id = req.params.id
  const event = await prisma.event.findUnique({
    where: {
      id,
    },
  })

  if (!event) {
    return res.status(404).json({ msg: 'event not found' })
  }

  try {
    const deletedEvent = await prisma.event.delete({
      where: {
        id,
      },
    })
    Log.info(`event ${id} was be deleted`)
    return res.status(204).json({ deleted: deletedEvent })
  } catch (err: any) {
    Log.error(`error: ${err.message}`)
  }
}

export async function editEvent(req: Request, res: Response) {
  const id = req.params.id
  const data = req.body
  try {
    const event = await prisma.event.findMany({ where: { id } })
    if (event.length === 0) {
      return res.status(404).json({ msg: 'event not found' })
    }

    const updatedEvent = await prisma.event.update({
      where: { id },
      data,
    })

    Log.info(`event ${id} was be updated`)
    return res.status(200).json({ updated: updatedEvent })
  } catch (err: any) {
    Log.error(`error: ${err.message}`)
    return res.status(500).json({ error: 'internal server error' })
  }
}
