import { getEventByIdRepository } from '../../infra/repositories/eventRepository'
import {
  createSubscriptionRepository,
  deleteSubscriptionRepository,
} from '../../infra/repositories/subscriptionRepository'
import { getUserByIdRepository } from '../../infra/repositories/userRepository'

export async function createSubscriptionUseCase(
  idUser: string,
  idEvent: string,
) {
  const isValidUser = await getUserByIdRepository(idUser)
  if (!isValidUser) throw new Error('User not found')

  const isValidEvent = await getEventByIdRepository(idEvent)
  if (!isValidEvent) throw new Error('Event not found')

  const createdSubscription = await createSubscriptionRepository(
    idUser,
    idEvent,
  )

  return createdSubscription
}

export async function deleteSubscriptionUseCase(id: string) {
  const deletedSubscription = await deleteSubscriptionRepository(id)

  return deletedSubscription
}
