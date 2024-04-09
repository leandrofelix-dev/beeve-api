/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express'

export type UserLogged = {
  user: {
    userId: string
    iat: number
  }
}

export type UserInfo = {
  userId: string
  iat: number
}

export interface APIResponse extends Response {
  status: (code: number) => this & {
    json: (body: any) => APIResponse & {
      content: {
        body?: string
        message: string
      }
    }
  }
}
