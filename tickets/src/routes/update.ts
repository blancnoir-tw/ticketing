import express, { Request, Response } from 'express'
import { body } from 'express-validator'
import { validateRequest, NotFoundError, requireAuth, NotAuthorizedError } from '@twtickets/common'
import { Ticket } from '../models/ticket'

const router = express.Router()

router.put(
  '/api/tickets/:id',
  requireAuth,
  [
    body('title').not().isEmpty().withMessage('Title is required'),
    body('price').isFloat({ gt: 0 }).withMessage('Price must be provided and must be greater than 0'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const ticket = await Ticket.findById(req.params.id)

    if (!ticket) {
      throw new NotFoundError()
    }

    // currentUser is defined by requireAuth
    if (ticket.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError()
    }

    const { title, price } = req.body
    ticket.set({
      title,
      price,
    })
    await ticket.save()

    res.send(ticket)
  }
)

export { router as updateTicketRouter }
