import { errorMessagesPTBR } from '../../../_shared/errors-messages'
import { UserInfo } from '../../../_shared/types'
import { EventCreateDTO } from '../../domain/models/eventDTO'
import {
  createEventRepository,
  findEventCodeByCode,
} from '../../infra/repositories/eventRepository'
import { generateCode } from '../utils/createEventCode'

export async function createEventUseCase(data: EventCreateDTO, user: UserInfo) {
  const { name, location, description } = data

  const maxParticipants = Number(data.maxParticipants)
  const isPublic = Boolean(data.isPublic)
  const dateTime = new Date(data.dateTime)

  const eventCode: string = generateCode()

  const alreadyExistThisEventCode = await findEventCodeByCode(eventCode)

  if (alreadyExistThisEventCode)
    throw new Error(errorMessagesPTBR['event/CODE_ALREADY_EXIST'])

  // const coverUrl = await uploadImage(file)
  // if (!coverUrl) throw new Error(errorMessagesPTBR['event/IMAGE_NOT_FOUND'])

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
