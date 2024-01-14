import { UserInfo } from '../../../_shared/types'
import { EventCreateDTO } from '../../domain/models/eventDTO'
import { createEventRepository } from '../../infra/repositories/eventRepository'
import { generateCode } from '../utils/createEventCode'

export async function createEventUseCase(data: EventCreateDTO, user: UserInfo) {
  const { name, location, description } = data

  const maxParticipants = Number(data.maxParticipants)
  const isPublic = Boolean(data.isPublic)
  const dateTime = new Date(data.dateTime)

  const eventCode: string = generateCode()

  const params = {
    idCreator: user.userId,
    coverUrl: null,
    name,
    location,
    description,
    maxParticipants,
    isPublic,
    dateTime,
    eventCode,
  }
  return await createEventRepository(params)
}
