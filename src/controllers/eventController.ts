import { Request, Response } from 'express'
import { prisma } from '../app'
import { generateCode } from '../utils/createEventCode'

export async function getEvent(req: Request, res: Response) {
  const eventCode = req.params.code
  try {
    const event = await prisma.event.findMany({
      where: { eventCode },
    })
    if (event.length === 0) {
      return res.status(404).json({ error: 'invalid event code' })
    }
    return res.status(200).json(event)
  } catch (e: any) {
    console.log(`Error: ${e.message}`)
  }
}

export async function getAllEvents(req: Request, res: Response) {
  try {
    const event = await prisma.event.findMany()
    if (event.length === 0) {
      return res.status(404).json({ msg: 'no events found' })
    }
    return res.status(200).json(event)
  } catch (e: any) {
    console.log(`Error: ${e.message}`)
  }
}

export async function createEvent(req: Request, res: Response) {
  const data = req.body
  const { name, date, location, description, maxParticipants, creator } = data
  const eventCode = generateCode()
  try {
    const event = await prisma.event.create({
      data: {
        name,
        creator,
        date,
        location,
        description,
        maxParticipants,
        eventCode,
      },
    })
    console.log(data)
    return res.status(201).json(event)
  } catch (e: any) {
    console.log(`Error: ${e.message}`)
  }
}
