import { Publisher, Subjects, OrderCancelledEvent } from '@twtickets/common'

export class OrderCreatedPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled
}
