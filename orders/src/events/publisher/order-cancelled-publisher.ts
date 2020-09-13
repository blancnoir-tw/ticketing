import { Publisher, Subjects, OrderCancelledEvent } from '@twtickets/common'

export class OrderCanceledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled
}
