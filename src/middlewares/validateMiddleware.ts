/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from 'express'
import { auth } from '../contracts/authContract'
import { subscription } from '../contracts/subscriptionContract'
import { user } from '../contracts/userContract'
import { event } from '../contracts/eventContract'

export function authValidator(req: Request, res: Response, next: NextFunction) {
  const { body } = req
  try {
    auth.parse(body)
    next()
  } catch (err: any) {
    res.status(400).json({ msg: err.errors })
  }
}

export function createUserValidator(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { body } = req
  try {
    user.parse(body)
    next()
  } catch (err: any) {
    res.status(400).json({ msg: err.errors })
  }
}

export async function createSubscriptionValidator(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { body } = req
  try {
    subscription.parse(body)
    next()
  } catch (err: any) {
    res.status(400).json({ msg: err.errors })
  }
}

export function createEventValidator(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { body } = req
  try {
    event.parse(body)
    next()
  } catch (err: Error | any) {
    res.status(400).json({ msg: err.errors })
  }
}
