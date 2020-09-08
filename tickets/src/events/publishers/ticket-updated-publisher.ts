import { Publisher, Subjects, TicketUpdatedEvent } from '@twtickets/common'

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated
}
