import express, { Request, Response } from 'express'
import { body } from 'express-validator'
import mongoose from 'mongoose'
import { requireAuth, validateRequest, NotFoundError, OrderStatus, BadRequestError } from '@twtickets/common'
import { Order } from '../models/order'
import { Ticket } from '../models/ticket'

const EXPIRATION_WINDOW_SECONDS = 15 * 60
const router = express.Router()

router.post(
  '/api/orders/',
  requireAuth,
  [
    body('ticketId')
      .not()
      .isEmpty()
      .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
      .withMessage('TicketId must be provided'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { ticketId } = req.body

    const ticket = await Ticket.findById(ticketId)
    if (!ticket) {
      throw new NotFoundError()
    }

    const isReserved = await ticket.isReserved()
    if (isReserved) {
      throw new BadRequestError('Ticker is already reserved')
    }

    const expiration = new Date()
    expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOW_SECONDS)

    const order = Order.build({
      userId: req.currentUser!.id, // already check requireAuth
      status: OrderStatus.Created,
      expiresAt: expiration,
      ticket,
    })
    await order.save()

    res.status(201).send(order)
  }
)

export { router as newOrderRouter }
