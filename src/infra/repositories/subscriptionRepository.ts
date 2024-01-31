/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from '../../../config/prisma'

export async function createSubscriptionRepository(id: string, data: any) {
  return await prisma.event.update({
    where: { id },
    data,
  })
}

export async function deleteSubscriptionRepository(id: string) {
  return await prisma.event.delete({
    where: { id },
  })
}
