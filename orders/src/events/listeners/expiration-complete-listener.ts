import { Message } from 'node-nats-streaming'
import { Listener, Subjects, ExpirationCompleteEvent, OrderStatus } from '@twtickets/common'
import { queueGroupName } from './queue-group-name'
import { Order } from '../../models/order'
import { OrderCanceledPublisher } from '../publisher/order-cancelled-publisher'

export class ExpirationCompleteListener extends Listener<ExpirationCompleteEvent> {
  readonly subject = Subjects.ExpirationComplete
  queueGroupName = queueGroupName

  async onMessage(data: ExpirationCompleteEvent['data'], msg: Message) {
    const order = await Order.findById(data.orderId).populate('ticket')
    if (!order) {
      throw new Error('Order not found')
    }
    if (order.status === OrderStatus.Complete) {
      msg.ack()
      return
    }

    order.set({
      status: OrderStatus.Cancelled,
    })
    await order.save()

    await new OrderCanceledPublisher(this.client).publish({
      id: order.id,
      version: order.version,
      ticket: {
        id: order.ticket.id,
      },
    })

    msg.ack()
  }
}
