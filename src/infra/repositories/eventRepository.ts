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

export async function deleteEventRepository(id: string) {
  return await prisma.event.delete({
    where: {
      id,
    },
  })
}

export async function editEventRepository(id: string, data: any) {
  return await prisma.event.update({
    where: { id },
    data,
  })
}

export async function getEventByCodeRepository(code: string) {
  return await prisma.event.findUnique({
    where: { eventCode: code },
  })
}

export async function getEventByIdRepository(id: string) {
  return await prisma.event.findUnique({
    where: { id },
  })
}

export async function getAllEventsRepository() {
  return await prisma.event.findMany()
}
