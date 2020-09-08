import { Publisher, Subjects, TicketCreatedEvent } from '@twtickets/common'

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated
}
