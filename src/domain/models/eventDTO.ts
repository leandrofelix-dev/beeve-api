export type EventCreateDTO = {
  name: string
  description: string
  location: string
  dateTime: Date
  maxParticipants: number
  isPublic: boolean
  eventCode: string
  coverUrl: string
}
