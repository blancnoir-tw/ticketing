import Queue from 'bull'
import { ExpirationCompletePublisher } from '../events/publishers/expiration-complete-publisher'
import { natsWrapper } from '../nats-wrapper'

interface Payload {
  orderId: string
}

const expiratinQueue = new Queue<Payload>('order:expiration', {
  redis: {
    host: process.env.REDIS_HOST,
  },
})

expiratinQueue.process(async job => {
  new ExpirationCompletePublisher(natsWrapper.client).publish({ orderId: job.data.orderId })
})

export { expiratinQueue }
