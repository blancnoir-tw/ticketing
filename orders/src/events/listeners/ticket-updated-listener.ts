import { Message } from 'node-nats-streaming'
import { Subjects, Listener, TicketUpdatedEvent } from '@twtickets/common'
import { Ticket } from '../../models/ticket'
import { queueGroupName } from './queue-group-name'

export class TicketUpdatedListener extends Listener<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated
  queueGroupName = queueGroupName

  async onMessage(data: TicketUpdatedEvent['data'], msg: Message) {
    const { id, version, title, price } = data

    const ticket = await Ticket.findByEvent({ id, version })
    if (!ticket) {
      throw new Error('Ticket not found')
    }

    ticket.set({ title, price })
    await ticket.save()

    msg.ack()
  }
}
