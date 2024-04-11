export type EventCreateDTO = {
  name: string
  description: string
  location: string
  startDateTime: Date
  endDateTime: Date
  maxParticipants: number
  isPublic: boolean
  isRemote: boolean
  eventCode: string
  coverUrl: string
}
