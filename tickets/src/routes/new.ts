import express, { Request, Response } from 'express'
import { body } from 'express-validator'
import { requireAuth, validateRequest } from '@twtickets/common'

import { Ticket } from '../models/ticket'

const router = express.Router()

router.post(
  '/api/tickets',
  requireAuth,
  [
    body('title').not().isEmpty().withMessage('Title is required'),
    body('price').isFloat({ gt: 0 }).withMessage('Price must be greater than 0'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { title, price } = req.body
    const ticket = Ticket.build({ title, price, userId: req.currentUser!.id }) // currentUser is defined by requireAuth
    await ticket.save()

    res.sendStatus(201)
  }
)

export { router as createTicketRouter }
