import { errorMessagesPTBR } from '../../../shared/errors-messages'
import { UserInfo } from '../../../shared/types'
import logger from '../../../config/logger'
import { EventCreateDTO } from '../../domain/models/eventDTO'
import {
  createEventRepository,
  deleteEventRepository,
  editEventRepository,
  getAllEventsRepository,
  getEventByCodeRepository,
  getEventByIdRepository,
} from '../../infra/repositories/eventRepository'
import { generateCode } from '../utils/createEventCode'

export async function createEventUseCase(data: EventCreateDTO, user: UserInfo) {
  const { name, location, description, coverUrl } = data

  const maxParticipants = Number(data.maxParticipants)
  const isPublic = Boolean(data.isPublic)
  const isRemote = Boolean(data.isRemote)
  const startDateTime = new Date(data.startDateTime)
  const endDateTime = new Date(data.endDateTime)

  const eventCode: string = generateCode()

  const alreadyExistThisEventCode = await getEventByCodeRepository(eventCode)

  if (alreadyExistThisEventCode) {
    logger.error(errorMessagesPTBR['event/CODE_ALREADY_EXIST'])
    return new Error(errorMessagesPTBR['api/ERROR'])
  }

  const params = {
    idCreator: user.userId,
    name,
    location,
    description,
    maxParticipants,
    isPublic,
    coverUrl,
    startDateTime,
    endDateTime,
    isRemote,
    eventCode,
  }
  return await createEventRepository(params)
}

export async function deleteEventUseCase(id: string) {
  const event = await getEventByIdRepository(id)

  if (!event) throw new Error(errorMessagesPTBR['event/NOT_FOUND'])

  return await deleteEventRepository(id)
}

export async function editEventUseCase(id: string, data: Event) {
  const event = await getEventByIdRepository(id)
  if (event) throw new Error(errorMessagesPTBR['event/NOT_FOUND'])
  return await editEventRepository(id, data)
}

export async function getEventByCodeUseCase(code: string) {
  return getEventByCodeRepository(code)
}

export async function getEventByIdUseCase(id: string) {
  return getEventByIdRepository(id)
}

export async function getAllEventsUseCase() {
  const events = await getAllEventsRepository()
  if (events.length === 0)
    return new Error(errorMessagesPTBR['event/NOT_FOUND'])
  return events
}
