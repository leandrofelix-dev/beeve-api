/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from 'express'
import { auth } from '../../domain/contracts/authContract'
import { subscription } from '../../domain/contracts/subscriptionContract'
import { user } from '../../domain/contracts/userContract'
import { event } from '../../domain/contracts/eventContract'

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
    res.status(400).json({ err: err.message })
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
    next(body)
  } catch (err: any) {
    res.status(400).json({ msg: err.errors })
  }
}

export function createEventValidator(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const data = req.body
  try {
    event.parse(data)
    next()
  } catch (err: any) {
    res.status(400).json({ msg: err.errors })
  }
}
