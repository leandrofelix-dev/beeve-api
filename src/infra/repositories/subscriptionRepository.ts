import { prisma } from '../../../config/prisma'

export async function createSubscriptionRepository(id: string, data: any) {
  return await prisma.event.update({
    where: { id },
    data,
  })
}
