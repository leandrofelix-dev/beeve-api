import { Event } from '@prisma/client'
import { prisma } from '../../../config/prisma'

export async function createEventRepository(data: Omit<Event, 'id'>) {
  return await prisma.event.create({
    data: {
      name: data.name,
      location: data.location,
      description: data.description,
      maxParticipants: data.maxParticipants,
      isPublic: data.isPublic,
      dateTime: data.dateTime,
      eventCode: data.eventCode,
      creator: { connect: { id: data.idCreator } },
      coverUrl: data.coverUrl,
    },
  })
}

export async function findEventCodeByCode(eventCode: string) {
  return await prisma.event.findUnique({
    where: { eventCode },
  })
}

export async function findEventCodeById(id: string) {
  return await prisma.event.findUnique({
    where: { id },
  })
}

export async function deleteEventRepository(id: string) {
  return await prisma.event.delete({
    where: {
      id,
    },
  })
}
