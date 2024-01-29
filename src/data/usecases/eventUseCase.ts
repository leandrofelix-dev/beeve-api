import { errorMessagesPTBR } from '../../../_shared/errors-messages'
import { UserInfo } from '../../../_shared/types'
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
  const dateTime = new Date(data.dateTime)

  const eventCode: string = generateCode()

  const alreadyExistThisEventCode = await getEventByCodeRepository(eventCode)

  if (alreadyExistThisEventCode)
    throw new Error(errorMessagesPTBR['event/CODE_ALREADY_EXIST'])

  if (!coverUrl) throw new Error(errorMessagesPTBR['event/COVER_NOT_FOUND'])

  const params = {
    idCreator: user.userId,
    coverUrl,
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
  return getAllEventsRepository()
}
