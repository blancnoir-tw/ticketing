import { Subjects, Publisher, PaymentCreatedEvent } from '@twtickets/common'

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated
}
